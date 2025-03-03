"use client";
import { useSession } from "next-auth/react";
import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
  ShoppingBag,
  Tags,
  SquareUserRound,
  UsersRound,
  Store,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import { AdminSideMenus } from "@/components/admin-side-menu";
import { NavUser } from "@/components/nav-user";
import { EnterpriseHead } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Acces rapide",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Ventes",
          url: "#",
        },
        {
          title: "Stocks",
          url: "#",
        },
        {
          title: "Progression",
          url: "#",
        },
      ],
    },
  ],
  menuAdmins: [
    {
      name: "Produits",
      url: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      name: "Categories",
      url: "/dashboard/categories",
      icon: Tags,
    },
    {
      name: "Point de ventes",
      url: "/dashboard/point-of-sale",
      icon: Store,
    },
    {
      name: "Vendeurs",
      url: "/dashboard/salers",
      icon: UsersRound,
    },
    {
      name: "Clients",
      url: "/dashboard/clients",
      icon: SquareUserRound,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EnterpriseHead />
      </SidebarHeader>
      <SidebarContent>
        <AdminSideMenus menus={data.menuAdmins} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
