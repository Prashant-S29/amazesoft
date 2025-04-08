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
    .input(z.object({ mail: z.string().email("Invalid email") }))
    .mutation(async ({ input, ctx }) => {
      // check if the user exists and is a vendor
      const isVendorExists = await ctx.db.user.findUnique({
        where: {
          email: input.mail,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (!isVendorExists || isVendorExists.role !== "Vendor") {
        return {
          data: null,
          error: "User does not exist or is not a vendor",
          message: "Profile not found",
        };
      }

      // update invitation status
      const updateInvitationStatusRes = await ctx.db.user.update({
        where: {
          email: input.mail,
        },
        data: {
          status: "Accepted",
        },
        select: {
          email: true,
          status: true,
        },
      });

      if (
        !updateInvitationStatusRes?.email ||
        updateInvitationStatusRes.status !== "Accepted"
      ) {
        return {
          data: null,
          error: "Error updating user",
          message: "Unexpected error, please try again",
        };
      }

      return {
        data: true,
        error: null,
        message: "Invitation accepted successfully",
      };
    }),
});
