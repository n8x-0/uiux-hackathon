import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Retrieve the token (if any) from cookies using your AUTH_SECRET
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define your protected routes
  const protectedRoutes = [
    "/bag",
    "/bag/checkout",
    "/account",
    "/account/(.*)/myorders",
    "/account/(.*)/orderhistory",
    "/account/(.*)/myorders/(.*)",
  ];

  // Check if the current request pathname matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\(\.\*\)/g, "[^/]+")}$`);
    return regex.test(pathname);
  });

  // If the route is protected and no token is found, redirect to /signin
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If user is already authenticated and tries to visit the signin page, redirect to dashboard
  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to desired routes
export const config = {
  matcher: [
    "/bag",
    "/bag/checkout",
    "/account/:path*",
  ],
};
