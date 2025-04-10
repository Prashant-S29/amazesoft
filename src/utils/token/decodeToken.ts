// "use server";

// import { jwtDecrypt } from "jose";
// import { env } from "~/env";

// export const decodeToken = async <T>(token: string) => {
//   try {
//     const encryptionKey = Buffer.from(env.JWT_SECRET, "hex");

//     const { payload } = await jwtDecrypt<{ data: T }>(token, encryptionKey);
//     console.log("token payload", payload);

//     return {
//       data: payload,
//       message: "Token decoded successfully",
//       error: null,
//     };
//   } catch (error) {
//     console.error("Token verification failed:", error);

//     return {
//       data: null,
//       message: error.code === "Token verification failed" ? "Invitation Expired" : "",
//       error: error,
//     };
//   }
// };

"use server";

import { jwtDecrypt } from "jose";
import { JWTExpired } from "jose/errors";
import { env } from "~/env";

export const decodeToken = async <T>(token: string) => {
  try {
    const encryptionKey = Buffer.from(env.JWT_SECRET, "hex");

    const { payload } = await jwtDecrypt<{ data: T }>(token, encryptionKey);
    console.log("token payload", payload);

    return {
      data: payload,
      message: "Token decoded successfully",
      error: null,
    };
  } catch (error) {
    console.error("Token verification failed:", error);

    let message = "";

    if (error instanceof JWTExpired) {
      message = "Invitation Expired";
    } else {
      message = "Token verification failed";
    }

    return {
      data: null,
      message: message,
      error: error,
    };
  }
};
