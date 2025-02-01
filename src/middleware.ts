import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const path = request.nextUrl.pathname;

  const protectedRoutes = [
    "/bag",
    "/bag/checkout",
    "/account",
    "/account/(.*)/myorders",
    "/account/(.*)/orderhistory",
    "/account/(.*)/myorders/(.*)",
  ];

  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\(\.\*\)/g, "[^/]+")}$`);
    return regex.test(path);
  });

  if (!token && isProtectedRoute) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  if (token && path === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bag",
    "/bag/checkout",
    "/account",
    "/account/(.*)/myorders",
    "/account/(.*)/orderhistory",
    "/account/(.*)/myorders/(.*)",
  ],
};