/**
 * Persistenza dei contenuti della home page e delle foto caricate.
 *
 * Due driver, scelti automaticamente:
 *
 *  - **Vercel Blob** quando la variabile `BLOB_READ_WRITE_TOKEN` è presente.
 *    È il driver da usare in produzione su Vercel: il filesystem delle
 *    funzioni serverless è di sola lettura ed effimero, quindi senza Blob
 *    le foto caricate andrebbero perse a ogni deploy.
 *
 *  - **Filesystem locale** in tutti gli altri casi (`data/site-content.json`
 *    e `data/uploads/`). Comodo in sviluppo e su un server Node tradizionale.
 *    Le immagini non vanno in `public/`: Next.js costruisce l'elenco dei file
 *    statici all'avvio, quindi una foto caricata dopo il boot non verrebbe
 *    servita. Vengono invece servite dalla route `/media/[file]`.
 */

import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { DEFAULT_CONTENT } from './default-content'
import { normalizeContent, type SiteContent } from './site-content'

const CONTENT_PATHNAME = 'focusottica/site-content.json'
const UPLOAD_PREFIX = 'focusottica/uploads/'

/**
 * Su Blob ogni file è salvato come `private` e servito dalla nostra route
 * `/media/[file]`, mai con l'URL diretto dello store.
 *
 * Due motivi: funziona qualunque sia la modalità dello store (uno store
 * "Private" non è tenuto ad accettare file pubblici), e le immagini restano
 * sul nostro dominio — stessa origine, quindi la prova virtuale può anche
 * salvare lo scatto senza inciampare nelle regole CORS del canvas.
 */
const BLOB_ACCESS = 'private' as const
const DATA_FILE = path.join(process.cwd(), 'data', 'site-content.json')
const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads')

/** Nome file generato da `saveUpload`, usato anche dalla route `/media/[file]`. */
export const UPLOAD_FILENAME_PATTERN = /^[0-9a-f-]{36}\.(jpg|png|webp|avif|gif)$/

export const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
}

export function usingBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export function storageDriverName(): string {
  return usingBlobStorage() ? 'Vercel Blob' : 'Filesystem locale'
}

/**
 * Su Vercel il disco delle funzioni è di sola lettura (tranne /tmp): senza
 * Vercel Blob il driver filesystem non può scrivere proprio nulla, quindi il
 * pannello admin non riesce a salvare né foto né testi.
 *
 * Restituisce il motivo per cui il salvataggio non è possibile, oppure null
 * se tutto è a posto. Serve a dare un messaggio chiaro invece di un errore 500.
 */
export function storageWriteBlocker(): string | null {
  if (usingBlobStorage()) return null
  if (process.env.VERCEL !== '1') return null

  return (
    'Il salvataggio è disattivato perché manca Vercel Blob. Su Vercel il disco ' +
    'è di sola lettura, quindi senza Blob né le foto né i testi possono essere ' +
    'salvati. Configura BLOB_READ_WRITE_TOKEN (Storage → Create Database → Blob) ' +
    'e rifai il deploy.'
  )
}

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

/**
 * Copia fresca del contenuto di default.
 * Restituire direttamente `DEFAULT_CONTENT` non va bene: chi legge lo
 * modifica (vedi la route di salvataggio) e sporcherebbe i default in
 * memoria per tutte le richieste successive.
 */
function freshDefaults(): SiteContent {
  return normalizeContent(DEFAULT_CONTENT)
}

export async function readContent(): Promise<SiteContent> {
  if (usingBlobStorage()) {
    try {
      const { get } = await import('@vercel/blob')
      const result = await get(CONTENT_PATHNAME, { access: BLOB_ACCESS, useCache: false })
      if (!result || result.statusCode !== 200) return freshDefaults()
      const text = await new Response(result.stream).text()
      return normalizeContent(JSON.parse(text))
    } catch (error) {
      console.error('[storage] lettura da Vercel Blob fallita:', error)
      return freshDefaults()
    }
  }

  try {
    const text = await fs.readFile(DATA_FILE, 'utf8')
    return normalizeContent(JSON.parse(text))
  } catch {
    // Nessun contenuto salvato: si parte dal contenuto di default.
    return freshDefaults()
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  const normalized = normalizeContent({ ...content, updatedAt: new Date().toISOString() })
  const body = JSON.stringify(normalized, null, 2)

  if (usingBlobStorage()) {
    const { put } = await import('@vercel/blob')
    await put(CONTENT_PATHNAME, body, {
      access: BLOB_ACCESS,
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    })
    return normalized
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, body, 'utf8')
  return normalized
}

/* ------------------------------------------------------------------ */
/* Upload immagini                                                     */
/* ------------------------------------------------------------------ */

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024 // 8 MB

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
}

export function isAllowedImageType(type: string): boolean {
  return type in ALLOWED_TYPES
}

export async function saveUpload(file: File): Promise<string> {
  const extension = ALLOWED_TYPES[file.type]
  if (!extension) throw new Error('Formato immagine non supportato')

  const filename = `${randomUUID()}.${extension}`
  const buffer = Buffer.from(await file.arrayBuffer())

  if (usingBlobStorage()) {
    const { put } = await import('@vercel/blob')
    await put(`${UPLOAD_PREFIX}${filename}`, buffer, {
      access: BLOB_ACCESS,
      contentType: file.type,
      addRandomSuffix: false,
    })
  } else {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)
  }

  // Stessa forma di URL con entrambi i driver: se un giorno si cambia
  // archiviazione, i contenuti già salvati continuano a puntare al posto giusto.
  return `/media/${filename}`
}

/** Foto caricata, pronta da servire. `body` è già utilizzabile come risposta. */
export interface StoredUpload {
  body: ReadableStream<Uint8Array> | Uint8Array
  contentType: string
}

export async function readUpload(filename: string): Promise<StoredUpload | null> {
  const extension = filename.split('.').pop() || ''
  const fallbackType = CONTENT_TYPE_BY_EXTENSION[extension] || 'application/octet-stream'

  if (usingBlobStorage()) {
    const { get } = await import('@vercel/blob')
    const result = await get(`${UPLOAD_PREFIX}${filename}`, {
      access: BLOB_ACCESS,
      useCache: true,
    })
    if (!result || result.statusCode !== 200) return null
    return { body: result.stream, contentType: result.blob.contentType || fallbackType }
  }

  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, filename))
    return { body: new Uint8Array(data), contentType: fallbackType }
  } catch {
    return null
  }
}
