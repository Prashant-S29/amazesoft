import { env } from "~/env";
import { EncryptJWT } from "jose";

// types
import type { TokenPayload } from "~/types";

export const generateToken = async <T>(
  data: TokenPayload<T>,
): Promise<{
  token: string | null;
  message: string;
}> => {
  const encryptionKey = Buffer.from(env.JWT_SECRET, "hex");

  try {
    const token = await new EncryptJWT(data)
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .encrypt(encryptionKey);

    return {
      token: token,
      message: "token generated successfully",
    };
  } catch (error) {
    return {
      token: null,
      message: JSON.stringify(error),
    };
  }
};
