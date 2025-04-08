"use server";

import { jwtDecrypt } from "jose";
import { env } from "~/env";

export const decodeToken = async <T>(token: string) => {
  try {
    const encryptionKey = Buffer.from(env.JWT_SECRET, "hex");

    const { payload } = await jwtDecrypt<{ data: T }>(token, encryptionKey);

    return {
      data: payload,
      message: "Token decoded successfully",
      error: null,
    };
  } catch (error) {
    console.error("Token verification failed:", error);

    return {
      data: null,
      message: "Token verification failed",
      error: error,
    };
  }
};
