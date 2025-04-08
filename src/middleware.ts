import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { env } from "./env";
import { auth } from "./server/auth";

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: env.AUTH_SECRET });
  const token = await auth();
  const { pathname } = req.nextUrl;

  const homeUrl = new URL("/", req.url);
  const loginUrl = new URL("/login", req.url);
  const adminDashboardUrl = new URL("/dashboard/admin", req.url);
  const vendorDashboardUrl = new URL("/dashboard/vendor", req.url);

  if (token?.user.id) {
    // if already logged in and trying to access login or signup
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname.includes("/vendor/join")
    ) {
      return NextResponse.redirect(homeUrl);
    }
  } else {
    // if no session and accessing any dashboard
    if (pathname.includes("/dashboard")) {
      return NextResponse.redirect(loginUrl);
    }
  }

  // if role = User is accessing any dashboard
  if (pathname.includes("/dashboard") && token?.user.role === "User") {
    return NextResponse.redirect(homeUrl);
  }

  // making sure that only role = Admin access admin dashboard
  if (pathname.includes("/admin") && token?.user.role !== "Admin") {
    return NextResponse.redirect(homeUrl);
  }

  // for better ux
  if (pathname === "/dashboard") {
    if (token?.user.role === "Admin") {
      return NextResponse.redirect(adminDashboardUrl);
    } else if (token?.user.role === "Vendor") {
      return NextResponse.redirect(vendorDashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/vendor/join"],
};
