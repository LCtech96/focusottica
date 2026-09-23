import { NextResponse } from 'next/server'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  createSessionToken,
} from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let email = ''
  let password = ''

  try {
    const body = await request.json()
    email = typeof body?.email === 'string' ? body.email : ''
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Inserisci email e password.' }, { status: 400 })
  }

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: 'Email o password non corretti.' }, { status: 401 })
  }

  const token = await createSessionToken(email.trim().toLowerCase())
  const response = NextResponse.json({ ok: true })

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  return response
}
