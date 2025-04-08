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

export const HeaderUserProfile: React.FC = () => {
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
        <div className="bg-secondary flex max-w-[200px] cursor-pointer items-center gap-2 rounded-lg p-2">
          <div className="bg-primary text-primary-foreground flex h-6 items-center justify-center rounded-sm px-2 text-xs font-medium uppercase">
            {session.data?.user?.name?.split(" ")[0]?.charAt(0) ?? ""}
          </div>
          <p className="line-clamp-1 text-xs font-medium">
            {session.data?.user?.name ?? ""}
          </p>
        </div>
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
