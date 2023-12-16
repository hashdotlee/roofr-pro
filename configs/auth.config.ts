import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "login",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isHomePage = nextUrl.pathname === "/";
      const isDashboardPage = nextUrl.pathname === "/dashboard";
      const isApiRoute = nextUrl.pathname.startsWith("/api");

      if (isApiRoute) {
        return isLoggedIn
          ? true
          : NextResponse.redirect(new URL("/api", nextUrl.origin));
      }

      if (!isLoggedIn) return false;
      if (isHomePage)
        return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
      if (isDashboardPage)
        return NextResponse.redirect(
          new URL("/dashboard/jobs", nextUrl.origin)
        );

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
