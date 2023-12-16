import NextAuth from "next-auth";
import { authConfig } from "./configs/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
