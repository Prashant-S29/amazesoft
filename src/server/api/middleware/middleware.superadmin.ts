import { t } from "../trpc";
import { TRPCError } from "@trpc/server";

export const superAdminMiddleware = t.middleware(async ({ ctx, next }) => {
  const SuperAdminSecret = ctx.headers.get("SuperAdminSecret");

  if (SuperAdminSecret !== process.env.SuperAdminSecret) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Only be accessible by super admins",
    });
  }

  return next();
});

// Super Admin Procedure
export const superAdminProcedure = t.procedure.use(superAdminMiddleware);
