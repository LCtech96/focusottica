import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth'

/** Rotte pubbliche anche dentro l'area admin. */
const PUBLIC_PATHS = ['/admin/login', '/api/admin/login', '/api/admin/logout']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  if (PUBLIC_PATHS.includes(pathname)) {
    // Chi è già autenticato non ha motivo di rivedere il form di login.
    if (pathname === '/admin/login' && session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  if (session) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Sessione scaduta. Effettua di nuovo il login.' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
