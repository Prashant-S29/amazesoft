import { UserSignupSchema } from "~/schema/user";

import { createTRPCRouter } from "~/server/api/trpc";
import { publicProcedure } from "../middleware/middleware.public";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(UserSignupSchema)
    .mutation(async ({ input, ctx }) => {
      // check if the user already exists
      const isUserExists = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      });

      if (isUserExists) {
        return {
          data: null,
          error: "User already exists",
          message: "Account already exists, please login",
        };
      }

      // create new user
      const res = await ctx.db.user.create({
        data: {
          role: "User",
          name: input.name,
          email: input.email,

          // TODO: hash password
          password: input.password,
        },
        select: {
          id: true,
        },
      });

      if (!res.id) {
        return {
          data: null,
          error: "Error creating user",
          message: "Unexpected error, please try again",
        };
      }

      return {
        data: res,
        error: null,
        message: "User created successfully",
      };
    }),

  joinAsVendor: publicProcedure.mutation(async ({ ctx }) => {
    // check if invited or not
    const isInvitationExists = await ctx.db.vendorInvitation.findUnique({
      where: {
        email: ctx.session?.user.email ?? "",
      },
      select: {
        id: true,
      },
    });

    if (!isInvitationExists?.id) {
      return {
        data: null,
        error: "Invitation not found",
        message: "Invitation not found",
      };
    }

    // update the user role
    const updateUserRoleRes = await ctx.db.user.update({
      where: {
        email: ctx.session?.user.email ?? "",
      },
      data: {
        role: "Vendor",
      },
    });

    if (!updateUserRoleRes?.id) {
      return {
        data: null,
        error: "User not found",
        message: "User not found",
      };
    }

    // update the session
    // revalidatePath("/");

    // delete the invitation
    const deleteInvitationRes = await ctx.db.vendorInvitation.delete({
      where: {
        email: ctx.session?.user.email ?? "",
      },
      select: {
        id: true,
      },
    });

    if (!deleteInvitationRes.id) {
      return {
        data: null,
        error: "Unable to delete the invitation",
        message: "Invitation not found",
      };
    }

    return {
      data: updateUserRoleRes,
      error: null,
      message: "User joined successfully",
    };
  }),
});
