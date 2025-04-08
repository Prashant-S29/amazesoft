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
});
