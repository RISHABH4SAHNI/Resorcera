import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Block access to environment files
  if (request.nextUrl.pathname.match(/^\/\.env/)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Block access to sensitive files
  const sensitivePatterns = [
    /\/\.git\//,
    /\/node_modules\//,
    /\/prisma\//,
    /\.log$/,
    /\.env$/,
    /\.backup$/,
    /package-lock\.json$/,
    /yarn\.lock$/
  ]

  for (const pattern of sensitivePatterns) {
    if (pattern.test(request.nextUrl.pathname)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}