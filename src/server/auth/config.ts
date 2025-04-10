/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// next-auth and prisma
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { db } from "~/server/db";

// env
import { env } from "~/env";

// providers
import CredentialsProvider from "next-auth/providers/credentials";

// Define the shape of credentials
type Credential = {
  email?: string;
  password?: string;
};

export const authConfig: NextAuthConfig = {
  // @ts-expect-error - refer to this https://github.com/prisma/prisma/issues/25857
  adapter: PrismaAdapter(db),
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // @ts-expect-error idk
      async authorize(
        credentials: Partial<Record<keyof Credential, unknown>> | null,
      ) {
        console.log();
        if (!credentials) return null;

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        console.log("credentials", credentials);
        console.log("email", email);
        console.log("password", password);

        // Check if user exists
        const res = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            role: true,
            name: true,
            email: true,
            password: true,
          },
        });

        console.log("res", res);

        if (!res?.id) {
          return null;
        }

        // check if the password is correct
        if (res.password !== password) {
          return null;
        }

        // Return the user object
        return {
          id: res.id,
          role: res.role,
          name: res.name,
          email: res.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user?.id) {
        token.id = user.id;
        token.role = user.role;
        token.vendorId = user.vendorId;
      }

      if (trigger === "update") {
        token.role = session.role;
        token.vendorId = session.vendorId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          vendorId: token.vendorId,
        };
      }

      return session;
    },
  },
  logger: {
    error(error: Error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).type === "CredentialsSignin") {
        return;
      }
      console.error(error);
    },
    warn(message: string) {
      console.warn(message);
    },
    debug(message: string) {
      console.debug(message);
    },
  },
};
