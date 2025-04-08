import type { IconType } from "react-icons/lib";
import { DashboardIcons } from "~/icons";
// import { DashboardIcons } from "~/icons";

interface SideMenuItemProps {
  label: string;
  href: string;
  icon_filled: IconType;
  icon_outline: IconType;
}

export const SideMenuItems: SideMenuItemProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon_filled: DashboardIcons.DashboardFilled,
    icon_outline: DashboardIcons.DashboardOutline,
  },
  {
    label: "Vendors",
    href: "/dashboard/admin/vendors",
    icon_filled: DashboardIcons.VendorFilled,
    icon_outline: DashboardIcons.VendorOutline,
  },
  {
    label: "Account",
    href: "/dashboard/admin/account",
    icon_filled: DashboardIcons.AccountFilled,
    icon_outline: DashboardIcons.AccountOutline,
  },
  {
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon_filled: DashboardIcons.SettingsFilled,
    icon_outline: DashboardIcons.SettingsOutline,
  },
];
