import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export const checkAuth_server = async ({
  redirectTo,
  role,
}: {
  redirectTo: string;
  role?: Role;
}) => {
  const session = await auth();
  if (!session?.user.id || (role && session?.user.role !== role)) {
    redirect(redirectTo);
  }
};
