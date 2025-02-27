import { NextResponse } from "next/server"

// This is a mock function to check if an e_id exists
// In a real application, this would likely be an API call or database query
function checkIfExhibitionExists(e_id) {
  // For demonstration, let's assume exhibitions with e_id 1 to 10 exist
  return Number.parseInt(e_id) >= 1 && Number.parseInt(e_id) <= 300
}

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Check if the path matches the pattern for exhibit detail pages
  if (path.startsWith("/exhibit/detail/")) {
    const e_id = path.split("/").pop() // Get the e_id from the URL

    // If e_id is 'default', allow the request to proceed
    if (e_id === "default") {
      return NextResponse.next()
    }

    // Check if the exhibition exists
    if (!checkIfExhibitionExists(e_id)) {
      // If it doesn't exist, redirect to the default page
      return NextResponse.redirect(new URL("/exhibit/detail/default", request.url))
    }

    // If it exists, allow the request to proceed
    return NextResponse.next()
  }
}

export const config = {
  matcher: "/exhibit/detail/:path*",
}

