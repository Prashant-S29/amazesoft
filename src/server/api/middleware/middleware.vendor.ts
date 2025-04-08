import { t } from "../trpc";
import { TRPCError } from "@trpc/server";

export const vendorMiddleware = t.middleware(async ({ ctx, next }) => {
  if (
    ctx.session?.user.role !== "Admin" &&
    ctx.session?.user.role !== "Vendor"
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Only be accessible by admins and vendors",
    });
  }

  return next();
});

// Vendor Procedure
export const vendorProcedure = t.procedure.use(vendorMiddleware);
