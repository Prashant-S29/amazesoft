import { createTRPCRouter } from "~/server/api/trpc";
import { superAdminProcedure } from "../middleware/middleware.superadmin";
import { z } from "zod";
// import { AdminSignupSchema } from "~/schema/admin";

const AdminSignupSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

// schema

export const superAdminRouter = createTRPCRouter({
  createNewAdmin: superAdminProcedure
    .input(AdminSignupSchema)
    .mutation(async ({ input, ctx }) => {
      // check if the admin already exists
      const isAdminExists = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      });

      if (isAdminExists) {
        return {
          data: null,
          error: "Admin already exists",
          message: "Account already exists",
        };
      }

      // create new admin
      const res = await ctx.db.user.create({
        data: {
          role: "Admin",
          name: input.name,
          email: input.email,
          // status: "Accepted",

          // TODO: hash the password
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
});
