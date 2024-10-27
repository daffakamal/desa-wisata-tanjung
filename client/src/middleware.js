import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose' 

export async function middleware(request) {
  // Cek Authorization header dari request
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  // Jika mengakses halaman admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      // Verifikasi token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
      
      return NextResponse.next()
    } catch (error) {
      // Token tidak valid atau expired
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}