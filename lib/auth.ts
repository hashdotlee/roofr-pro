import NextAuth, { User } from "next-auth";
import { authConfig } from "@/configs/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { Account, AccountModel } from "@/models/Account";
import bcrypt from "bcrypt";
import dbConnect from "./dbConnect";
import { Roles } from "@/types/account";

async function getUser(
  email: string,
  password: string
): Promise<Account | null> {
  try {
    await dbConnect();
    const user = await AccountModel.findOne({ email });

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return null;

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

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
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8).max(40),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email, password);
        if (!user) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.firstName + " " + user.lastName,
          image: user.avatar,
          role: user.role,
        } satisfies User;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.picture = user.image;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as Roles;
      session.user.image = token.picture;
      session.user.id = token.id as string;
      return session;
    },
  },
});
