"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogoutIcon } from "~/icons";
import { Button } from "~/components/ui/button";

export const HeaderProfile: React.FC = () => {
  const session = useSession();

  const [loading, setLoading] = React.useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    await signOut({
      redirectTo: "/",
    });
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="h-8 w-8 rounded-full text-[12px] leading-none uppercase"
        >
          {session.data?.user?.name?.split(" ")[0]?.charAt(0) ?? ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-sidebar">
        <DropdownMenuLabel asChild>
          <section>
            <p className="text-sm font-semibold">{session.data?.user.name}</p>
            <p className="text-xs font-normal">{session.data?.user.email}</p>
          </section>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>Payments</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem disabled={loading} onClick={handleSignOut}>
          <LogoutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
