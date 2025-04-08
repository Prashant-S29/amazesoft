// types
import type { TokenPayload } from "~/types";

export const isTokenExpired = <T>(decodedToken: TokenPayload<T>) => {
  if (!decodedToken.exp) {
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp > decodedToken.exp) {
    return true;
  }

  return false;
};
