import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('🛡️ Middleware checking path:', pathname);

  // TEMPORARILY DISABLED - Allow all routes for debugging
  console.log('⚠️ MIDDLEWARE TEMPORARILY DISABLED - ALLOWING ALL ROUTES');
  return NextResponse.next();

  // This code is temporarily commented out for debugging
  /*
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/test-db'];
  
  // Check if the route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    console.log('✅ Public route, allowing access');
    return NextResponse.next();
  }

  // Skip middleware for static files and Next.js internals
  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  if (pathname.startsWith('/api/')) {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.userId);
    requestHeaders.set('x-user-email', user.email);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // For protected pages, redirect to login if not authenticated  
  if (pathname.startsWith('/dashboard')) {
    console.log('🔍 Checking authentication for protected route:', pathname);
    
    // Get all cookies for debugging
    const allCookies = request.cookies.getAll();
    console.log('🍪 All cookies:', allCookies.map(c => `${c.name}=${c.value.substring(0, 20)}...`));
    
    const user = getUserFromRequest(request);
    if (!user) {
      console.log('🔒 No user found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      console.log('✅ User authenticated:', user.email);
    }
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
