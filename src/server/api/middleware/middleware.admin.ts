import { t } from "../trpc";
import { TRPCError } from "@trpc/server";

export const adminMiddleware = t.middleware(async ({ ctx, next }) => {
  if (ctx.session?.user.role !== "Admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Only be accessible by admins and vendors",
    });
  }

  return next();
});

// Admin Procedure
export const adminProcedure = t.procedure.use(adminMiddleware);
