"use client";

import type { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useCheckAuth_client = ({
  redirectTo,
  role,
}: {
  redirectTo: string;
  role?: Role;
}) => {
  const session = useSession();
  const router = useRouter();
  if (!session?.data?.user.id || (role && session?.data?.user.role !== role)) {
    router.push(redirectTo);
  }
};
