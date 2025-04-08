import React from "react";
import Link from "next/link";

// icons
import { NotificationIcon } from "~/icons";

// components
import { Button } from "~/components/ui/button";
import { HeaderProfile } from "../HeaderProfile";

export const Header: React.FC = async () => {
  return (
    <header className="bg-background fixed top-0 z-50 flex w-full items-center justify-between border-b px-5 py-2">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        Amaze Soft Technologies
      </Link>
      <nav className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <NotificationIcon />
        </Button>
        {/* <div className="bg-primary/50 mx-3 h-4 w-[1px]" /> */}
        <HeaderProfile />
      </nav>
    </header>
  );
};
