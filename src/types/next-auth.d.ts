import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      vendorId: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    vendorId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    vendorId: string;
  }
}

export interface DefaultUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
