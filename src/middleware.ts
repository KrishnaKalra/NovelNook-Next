import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;

    const protectedRoutes = ['/', '/review', '/profile'];
    const isProtectedRoute = protectedRoutes.includes(url.pathname);
    
    // Redirect authenticated users away from sign-in page
    if (token && url.pathname === '/sign-in') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users trying to access protected pages
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
    matcher: ['/', '/review', '/profile', '/sign-in'],
};
