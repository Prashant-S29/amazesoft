"use client";

import React from "react";
import Link from "next/link";

// data
import { SideMenuItems } from "./data";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
// import { NavbarUserProfile } from "~/components/dashboard/common";

export const SideMenu: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="bg-background sticky top-0 flex h-screen w-full max-w-[250px] flex-col justify-between gap-2 border-r p-4 pt-[70px]">
      <div className="flex flex-col gap-1">
        {SideMenuItems.map((data, index) => (
          <Button
            key={index}
            variant={pathName === data.href ? "secondary" : "ghost"}
            asChild
            className="justify-start text-[13px]"
          >
            <Link href={data.href}>
              {pathName === data.href ? (
                <data.icon_filled />
              ) : (
                <data.icon_outline />
              )}
              <span>{data.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* <NavbarUserProfile /> */}
    </div>
  );
};
