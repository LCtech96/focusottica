/**
 * Autenticazione del pannello admin.
 *
 * Sessione basata su un cookie firmato con HMAC-SHA256 tramite Web Crypto,
 * così lo stesso codice funziona sia nel middleware (runtime Edge) sia nelle
 * route handler (runtime Node).
 *
 * Le credenziali si configurano con le variabili d'ambiente `ADMIN_EMAIL`,
 * `ADMIN_PASSWORD` e `AUTH_SECRET`. I valori di default servono a far
 * funzionare il pannello subito dopo il deploy: vanno sostituiti al più
 * presto (vedi ADMIN.md).
 */

export const SESSION_COOKIE = 'focusottica_admin'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 ore

const DEFAULT_EMAIL = 'shop@otticafocus.com'
const DEFAULT_PASSWORD = '123ottica.comfocus/26'
const DEFAULT_SECRET = 'focusottica-dev-secret-cambiami'

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase()
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD
}

function authSecret(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET
}

/** true quando password o segreto sono ancora quelli di default. */
export function usingDefaultCredentials(): boolean {
  return !process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET
}

/* ------------------------------------------------------------------ */
/* base64url                                                           */
/* ------------------------------------------------------------------ */

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): ArrayBuffer {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const buffer = new ArrayBuffer(binary.length)
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return buffer
}

/* ------------------------------------------------------------------ */
/* Firma e verifica                                                    */
/* ------------------------------------------------------------------ */

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(authSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export interface SessionPayload {
  email: string
  exp: number
}

export async function createSessionToken(email: string): Promise<string> {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  }
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)))
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(), encoder.encode(body))
  return `${body}.${toBase64Url(new Uint8Array(signature))}`
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(),
      fromBase64Url(signature),
      encoder.encode(body)
    )
    if (!valid) return null

    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as SessionPayload
    if (!payload?.email || typeof payload.exp !== 'number') return null
    if (payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */

/** Confronto a tempo costante, per non lasciar dedurre la password dai tempi. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function checkCredentials(email: string, password: string): boolean {
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail())
  const passwordOk = safeEqual(password, adminPassword())
  return emailOk && passwordOk
}
