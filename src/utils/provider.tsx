"use client";

// tRPC & next-auth
import { TRPCReactProvider } from "~/trpc/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// hooks
import { useMounted } from "~/hooks/useMounted";

// toast
import { Toaster } from "sonner";

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <TRPCReactProvider>
      <SessionProvider session={session}>
        <Toaster visibleToasts={3} richColors />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  );
};
