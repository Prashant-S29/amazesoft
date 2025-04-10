"use client";

// tRPC & next-auth
import { TRPCReactProvider } from "~/trpc/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// hooks
import { useMounted } from "~/hooks/useMounted";

// toast
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          // forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster visibleToasts={3} richColors />
          {children}
        </NextThemesProvider>
      </SessionProvider>
    </TRPCReactProvider>
  );
};
