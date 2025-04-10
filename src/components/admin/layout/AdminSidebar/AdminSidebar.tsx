"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { SideMenuItems } from "../SideMenu/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar className="pt-[60px]">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {SideMenuItems.map((data, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`${pathName === data.href && "bg-secondary"} rounded-sm`}
                  >
                    <Link
                      href={data.href}
                      className={`text-[13px] ${pathName !== data.href && "text-primary/50"}`}
                    >
                      {pathName === data.href ? (
                        <data.icon_filled />
                      ) : (
                        <data.icon_outline />
                      )}
                      <span>{data.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* <SidebarTrigger /> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
