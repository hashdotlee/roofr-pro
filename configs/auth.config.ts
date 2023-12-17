import { Roles } from "@/types/account";
import type { NextAuthConfig, Session } from "next-auth";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

const apiRoutes = {
  [Roles.ADMIN]: ["/api/customers"],
  [Roles.CONTRACTOR]: ["/api/customers"],
};

export const authConfig = {
  pages: {
    signIn: "login",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isApiRoute = nextUrl.pathname.startsWith("/api");
      if (isApiRoute) return authorizeAPIRoutes(auth, nextUrl, request);
      return authorizeAppRoutes(auth, nextUrl);
    },
  },
  providers: [],
} satisfies NextAuthConfig;

function authorizeAPIRoutes(
  auth: Session | null,
  nextUrl: NextURL,
  request: NextRequest
) {
  const { method } = request;
  const isLoggedIn = !!auth?.user;

  if (!isLoggedIn)
    return NextResponse.redirect(new URL("/api", nextUrl.origin));

  const role = auth?.user?.role;
  const isAuthorized = apiRoutes[role as Roles].some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  return isAuthorized;
}

function authorizeAppRoutes(auth: Session | null, nextUrl: NextURL) {
  const isHomePage = nextUrl.pathname === "/";
  const isDashboardPage = nextUrl.pathname === "/dashboard";
  const isLoggedIn = !!auth?.user;

  if (!isLoggedIn) return false;
  if (isHomePage || isDashboardPage)
    return NextResponse.redirect(new URL("/dashboard/jobs", nextUrl.origin));
  return true;
}
