// zod and tRPC
import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";

// utils
// import { isTokenExpired } from "~/utils/token/checkExpiry";
import { decodeToken } from "~/utils/token/decodeToken";

// middleware
import { publicProcedure } from "../middleware/middleware.public";

// type
import type { VendorInvitationTokenPayload } from "~/types/payload";

export const tokenRouter = createTRPCRouter({
  handleVendorInvitationToken: publicProcedure
    .input(z.object({ tokenId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // get token from db
      const token = await ctx.db.user.findUnique({
        where: {
          id: input.tokenId,
        },
        select: {
          email: true,
          invitationToken: true,
        },
      });

      console.log(token);

      if (!token?.invitationToken) {
        return {
          data: null,
          error: "Invitation not found",
          message: "Invitation not found",
        };
      }

      const decodedToken = await decodeToken<VendorInvitationTokenPayload>(
        token.invitationToken,
      );

      if (!decodedToken.data?.data.email || !decodedToken.data?.data.password) {
        return {
          data: null,
          error: "Email not found in the token",
          message: "Invitation not found",
        };
      }

      // verify the token
      const isTokenValid = token.email === decodedToken.data?.data.email;

      // check expiry
      // const isExpired = isTokenExpired<VendorInvitationTokenPayload>(data);

      // if expired, delete the token
      // if (isExpired) {
      //   return {
      //     data: null,
      //     error: "Token expired",
      //     message: "Invitation expired. Please ask for a new invitation",
      //   };
      // }

      return {
        data: {
          email: decodedToken.data.data.email,
          password: decodedToken.data.data.password,
          isTokenValid,
        },
        error: null,
        message: isTokenValid ? "Invitation verified" : "Invitation not found",
      };
    }),
});
