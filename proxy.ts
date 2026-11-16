import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "./lib/jwt";
import { SESSION_COOKIE } from "./lib/session-cookie";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isSignInPath(pathname: string) {
  return pathname === "/sign-in" || pathname.startsWith("/sign-in/");
}

function isTourPath(pathname: string) {
  return pathname === "/MarafeiEducationPlatform" || pathname.startsWith("/MarafeiEducationPlatform/");
}

function isTourIcon(pathname: string) {
  return (
    pathname === "/MarafeiEducationPlatform/favicon.ico" ||
    pathname.startsWith("/MarafeiEducationPlatform/misc/icon")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (pathname === "/") {
    const destination = session ? "/MarafeiEducationPlatform/" : "/sign-in/";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isTourPath(pathname) && !session && !isTourIcon(pathname)) {
    return NextResponse.redirect(new URL("/sign-in/", request.url));
  }

  if (isAdminPath(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in/", request.url));
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/MarafeiEducationPlatform/", request.url));
    }
  }

  if (isSignInPath(pathname) && session) {
    const destination =
      session.role === "admin" ? "/admin/" : "/MarafeiEducationPlatform/";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/admin/:path*",
    "/sign-in",
    "/sign-in/:path*",
    "/MarafeiEducationPlatform",
    "/MarafeiEducationPlatform/:path*",
  ],
};
