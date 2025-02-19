import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/public"],
  
  // Routes that can be accessed while signed out
  ignoredRoutes: ["/api/webhook/clerk","/profile(.*)"],
});
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if it's an admin path
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const adminSession = request.cookies.get("admin_session");

    // Redirect to login if no admin session
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// ... existing code ...

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", 
    "/", 
    "/(api|trpc)(.*)",
    "/admin/:path*"
  ],
};