import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

// routes
import {
  userRouter,
  adminRouter,
  mailRouter,
  superAdminRouter,
  tokenRouter,
  vendorRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
  mail: mailRouter,
  token: tokenRouter,
  user: userRouter,
  vendor: vendorRouter,
  admin: adminRouter,
  superAdmin: superAdminRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
