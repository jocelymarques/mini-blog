import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const protectedRoutes = ['/dashboard', '/profile', '/admin'];
    const authRoutes = ['/login', '/register'];
    const { pathname } = request.nextUrl;
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    const token = request.cookies.get('authToken')?.value;
    if (isProtectedRoute && !token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isAuthRoute && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    // Log do erro para debug
    console.error('Middleware error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};