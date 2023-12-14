import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
