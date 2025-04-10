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
      const token = await ctx.db.vendorInvitation.findUnique({
        where: {
          id: input.tokenId,
        },
        select: {
          email: true,
          token: true,
        },
      });

      console.log("token from db", token);

      console.log(token);

      if (!token?.token) {
        return {
          data: null,
          error: "Invitation not found",
          message: "Invitation not found",
        };
      }

      const decodedToken = await decodeToken<VendorInvitationTokenPayload>(
        token.token,
      );

      console.log("decodedToken", decodedToken);

      if (!decodedToken.data?.data.email) {
        // delete invitation
        await ctx.db.vendorInvitation.delete({
          where: {
            id: input.tokenId,
          },
        });

        return {
          data: null,
          error: "Email not found in the token",
          message: decodedToken.message,
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
          isTokenValid,
        },
        error: null,
        message: isTokenValid ? "Invitation verified" : "Invitation not found",
      };
    }),
});
