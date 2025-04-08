import React from "react";
import Link from "next/link";

// auth
import { auth } from "~/server/auth";

// components
import { Button } from "~/components/ui/button";
import { HeaderUserProfile } from "../HeaderUserProfile";

export const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[150px] py-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        Amaze Soft Technologies
      </Link>
      <nav className="flex items-center gap-2">
        {session?.user?.id ? (
          <>
            {session.user.role === "User" ? (
              <HeaderUserProfile />
            ) : (
              <Button size="sm" variant="default" asChild>
                <Link href="/dashboard">Dashboard</Link>
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
