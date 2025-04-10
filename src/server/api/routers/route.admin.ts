// trpc
import { createTRPCRouter, t } from "~/server/api/trpc";
import { adminProcedure } from "../middleware/middleware.admin";

// schema
import { InviteVendorFormSchema } from "~/schema/vendor/schema.inviteVendor";

// utils
import { generateToken } from "~/utils/token";

// types
import type { VendorInvitationTokenPayload } from "~/types/payload";

// routers
import { mailRouter } from "./route.mail";
import { Role } from "@prisma/client";

const createCaller = t.createCallerFactory(mailRouter);

export const adminRouter = createTRPCRouter({
  createNewVendor: adminProcedure
    .input(InviteVendorFormSchema)
    .mutation(async ({ input, ctx }) => {
      //check if user already has an invitation
      const isVendorExists = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (isVendorExists?.id) {
        return {
          data: null,
          error: "This vendor already exists",
          message: "This vendor already exists",
        };
      }

      if (isVendorExists?.role === "Admin") {
        return {
          data: null,
          error: "Cannot invite an admin as a vendor.",
          message: "Cannot invite an admin as a vendor.",
        };
      }

      // create new user
      const createNewUserRes = await ctx.db.user.create({
        data: {
          email: input.email,
          role: Role.Vendor,
        },
        select: {
          id: true,
        },
      });

      if (!createNewUserRes.id) {
        console.error("unable to create a new vendor");
        return {
          data: null,
          error: "Unable to create new vendor",
          message: "Unable to create new vendor",
        };
      }

      return {
        data: createNewUserRes,
        error: null,
        message: "Vendor created successfully",
      };
    }),

  inviteVendor: adminProcedure
    .input(InviteVendorFormSchema)
    .mutation(async ({ input, ctx }) => {
      const caller = createCaller(ctx);

      // check if user already has an invitation
      const isInvitationExists = await ctx.db.vendorInvitation.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      });

      if (isInvitationExists?.id) {
        return {
          data: null,
          error: "This vendor already has an invitation",
          message: "This vendor already has an invitation",
        };
      }

      // check if the vendor is already exists
      const isVendorExists = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (isVendorExists?.role === "Admin") {
        return {
          data: null,
          error: "Cannot invite an admin as a vendor.",
          message: "Cannot invite an admin as a vendor.",
        };
      }

      if (isVendorExists?.role === "Vendor") {
        return {
          data: null,
          error: "This vendor already exists",
          message: "This vendor already exists",
        };
      }

      // create new token
      const invitationToken = await generateToken<VendorInvitationTokenPayload>(
        { data: input },
      );

      if (!invitationToken.token) {
        console.error("unable to generate token");
        return {
          data: null,
          error: invitationToken.message,
          message: "Unable to send invitation",
        };
      }

      // create new invitation and save the token
      const createNewInvitationRes = await ctx.db.vendorInvitation.create({
        data: {
          email: input.email,
          token: invitationToken.token,
          // role: Role.Vendor,
        },
        select: {
          id: true,
        },
      });

      if (!createNewInvitationRes.id) {
        console.error("unable to create a new vendor");
        return {
          data: null,
          error: "Unable to create new vendor",
          message: "Unable to create vendor invitation",
        };
      }

      // send invitation email
      const mailRes = await caller.sendVendorInvitationMail({
        receiverMail: input.email,
        senderName: ctx.session?.user.name ?? "Amaze Soft Technologies",
        invitationLink: `http://localhost:3000/vendor/join?tokenId=${createNewInvitationRes.id}`,
      });

      if (!mailRes?.messageId) {
        return {
          data: null,
          message: "Unable to send invitation",
          error: "Unable to send invitation",
        };
      }

      return {
        data: input,
        error: null,
        message: "Invitation sent successfully",
      };
    }),

  getAllVendors: adminProcedure.query(async ({ ctx }) => {
    const allVendors = await ctx.db.user.findMany({
      where: {
        role: Role.Vendor,
      },
      omit: {
        password: true,
      },
    });

    if (!allVendors || allVendors.length === 0) {
      return {
        data: null,
        error: "No vendors found",
        message: "No vendors found",
      };
    }

    return {
      data: allVendors,
      error: null,
      message: "All vendors fetched successfully",
    };
  }),
});
