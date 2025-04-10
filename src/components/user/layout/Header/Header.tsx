import React from "react";
import Link from "next/link";

// auth
import { auth } from "~/server/auth";

// components
import { Button } from "~/components/ui/button";
import { HeaderUserProfile } from "../HeaderUserProfile";
import { ThemeToggler } from "~/components/common";

export const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[150px] py-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        Amaze Soft Technologies
      </Link>
      <nav className="flex items-center gap-2">
        <ThemeToggler />
        <div className="bg-primary/70 mx-3 h-4 w-[1px]" />
        {session?.user?.id ? (
          <>
            {session.user.role === "User" ? (
              <HeaderUserProfile />
            ) : (
              <Button size="sm" variant="default" asChild>
                {session.user.role === "Admin" ? (
                  <Link href="/dashboard/admin">Dashboard</Link>
                ) : (
                  <Link href="/dashboard/vendor">Dashboard</Link>
                )}
              </Button>
            )}
          </>
        ) : (
          <Button size="sm" variant="default" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};
