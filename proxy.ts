import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    // If not logged in, force them to the login page
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  // This tells Next.js exactly which routes to protect
  matcher: ["/dashboard/:path*"],
};