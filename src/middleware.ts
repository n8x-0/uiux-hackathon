import { auth } from "./auth";

const protectedRoutes = [
  "/bag",
  "/bag/checkout",
  "/account",
  "/account/:path*"
];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  const url = process.env.NEXT_PUBLIC_BASE_URL

  const isPrivateRoute = protectedRoutes.includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.includes("/auth")
  const isApiRoute = nextUrl.pathname.includes("/api")

  if (isApiRoute) return

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/account`)
  }
  if (isAuthRoute && !isLoggedIn) return

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/signin`)
  }
})

export const config = {
  matcher: [
    "/account/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};