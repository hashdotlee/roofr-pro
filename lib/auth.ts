import NextAuth from "next-auth";
import { authConfig } from "@/configs/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = {
          id: "1",
          email: "john@gmail.com",
          name: "John Doe",
          password: "88888888",
        };

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8).max(40),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        if (email !== user.email || password !== user.password) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
