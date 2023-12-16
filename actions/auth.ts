"use server";

import { StatusCodes } from "http-status-codes";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export type AuthResponse = {
  ok: boolean;
  message: string;
  status: number;
};

export async function login(options: Record<string, any>) {
  try {
    await signIn("credentials", {
      ...options,
      redirect: false,
    });
    return {
      ok: true,
      message: "Welcome back!",
      status: StatusCodes.OK,
    } satisfies AuthResponse;
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        ok: false,
        message: "Invalid email or password.",
        status: StatusCodes.UNAUTHORIZED,
      } satisfies AuthResponse;
    }
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    } satisfies AuthResponse;
  }
}

export async function logout() {
  try {
    await signOut({
      redirect: false,
    });
  } catch (error) {
    console.error(error);
  }
}
