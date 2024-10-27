// middleware.ts
import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const isAuthenticated = request.cookies.get('admin_token')
  
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}