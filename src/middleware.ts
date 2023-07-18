import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname, origin } = request.nextUrl
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })
  console.log('MIDDLEWARE SESSION', session)

  if (pathname === '/login' || pathname === '/signup') {
    if (session) return NextResponse.redirect(`${origin}`)
    return NextResponse.next()
  }

  if (!session)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)

  if (pathname.includes('/candidateintakeform')) {
    if (!session.candidateIntakeFormSubmited) {
      return NextResponse.next()
    }
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`)
  }
  //   if (pathname.includes('/invoice')) {
  //     if (session.candidateIntakeFormSubmited) {
  //       return NextResponse.next()
  //     }
  //     return NextResponse.redirect(
  //       `${process.env.NEXTAUTH_URL}/candidateintakeform`
  //     )
  //   }
  if (pathname.includes('/dashboard')) {
    if (session.candidateIntakeFormSubmited) {
      return NextResponse.next()
    }
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/candidateintakeform`
    )
  }
}

export const config = {
  matcher: [
    '/',
    '/candidateintakeform/:path*',

    '/login/:path*',
    '/signup/:path*',
  ],
}
