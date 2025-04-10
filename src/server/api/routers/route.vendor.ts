// zod and trpc
import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";
import { vendorProcedure } from "../middleware/middleware.vendor";
import { publicProcedure } from "../middleware/middleware.public";

export const vendorRouter = createTRPCRouter({
  createNewVendorFromInvitation: vendorProcedure
    .input(z.object({ mail: z.string().email("Invalid email") }))
    .mutation(async ({ input, ctx }) => {
      // check if the user already exists
      const isUserExists = await ctx.db.user.findUnique({
        where: {
          email: input.mail,
        },
        select: {
          id: true,
        },
      });

      if (isUserExists) {
        return {
          data: null,
          error: "User already exists",
          message: "Account already exists",
        };
      }

      // create new user
      const newUserRes = await ctx.db.user.create({
        data: {
          email: input.mail,
          role: "Vendor",
        },
        select: {
          id: true,
        },
      });

      if (!newUserRes.id) {
        return {
          data: null,
          error: "Error creating user",
          message: "Unexpected error, please try again",
        };
      }

      return {
        data: newUserRes,
        error: null,
        message: "User created successfully",
      };
    }),

  acceptInvitation: publicProcedure
    .input(z.object({ tokenId: z.string().min(1, "tokenId is required") }))
    .mutation(async ({ input, ctx }) => {
      // TODO: delete the token
      // check if the user exists and is a vendor
      const acceptVendorInvitation = await ctx.db.vendorInvitation.update({
        where: {
          id: input.tokenId,
        },
        data: {
          status: "Accepted",
        },
      });

      if (!acceptVendorInvitation?.id) {
        return {
          data: null,
          error: "User does not exist or is not a vendor",
          message: "Profile not found",
        };
      }

      return {
        data: acceptVendorInvitation,
        message: "Invitation accepted successfully",
        error: null,
      };
    }),
});
