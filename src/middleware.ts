import { NextRequest, NextResponse } from 'next/server';

// matcher에 정의된 URL에서만 Middleware가 실행되도록 설정
export const config = { matcher: ['/login', '/signup', '/day/:path*', '/mypage/:path*', '/'] };

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = process.env.MODE === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
  const isAuthenticated = !!req.cookies.get(sessionToken);

  const unauthenticatedOnlyPaths = ['/login', '/signup'];
  const authenticatedOnlyPaths = ['/mypage', '/day'];

  const isUnauthenticatedOnlyPath = unauthenticatedOnlyPaths.includes(pathname);
  const isAuthenticatedOnlyPath = pathname === '/' || authenticatedOnlyPaths.some((path) => pathname.startsWith(path));

  if (isUnauthenticatedOnlyPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAuthenticatedOnlyPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  return NextResponse.next();
}
