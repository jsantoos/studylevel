import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/mock-exams",
  "/analytics",
  "/ranking",
  "/settings",
];

export function middleware(
  request: NextRequest,
) {

  const token =
    request.cookies.get(
      "study_ai_token",
    );

  const isProtectedRoute =
    protectedRoutes.some(
      (route) =>
        request.nextUrl.pathname.startsWith(
          route,
        ),
    );

  if (
    isProtectedRoute &&
    !token
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mock-exams/:path*",
    "/analytics/:path*",
    "/ranking/:path*",
    "/settings/:path*",
  ],
};