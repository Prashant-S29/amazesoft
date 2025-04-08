// src/app/actions/auth-actions.ts
"use server";

import { signIn } from "~/server/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInVendor({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    revalidatePath("/");
    return redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.error("Invalid credentials");
          return { error: "Invalid credentials" };
        default:
          console.error("An error occurred during sign in", error);
          return { error: "An error occurred during sign in" };
      }
    }
    throw error;
  }
}
