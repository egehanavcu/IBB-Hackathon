import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
