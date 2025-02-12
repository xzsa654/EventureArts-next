import { NextResponse } from "next/server"

export function middleware(request) {
  const path = request.nextUrl.pathname

  if (
    path === "/exhibit/detail" ||
    (path.startsWith("/exhibit/detail/") && path.split("/").length === 4 && !path.includes("default"))
  ) {
    // If there's no e_id or it's not the default page, redirect to the default detail page
    return NextResponse.redirect(new URL("/exhibit/detail/default", request.url))
  }
}

export const config = {
  matcher: "/exhibit/detail/:path*",
}

