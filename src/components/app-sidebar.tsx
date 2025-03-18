import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ShoppingBag,
  Tags,
  UsersRound,
  Store,
  Shapes,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import { AdminSideMenus } from "@/components/admin-side-menu";
import { NavUser } from "@/components/nav-user";
import { EnterpriseHead } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { SideBarButtonSale } from "./sidebar/sale-button";
import { auth } from "@/auth";

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
      icon: Shapes,
      isActive: true,
      items: [
        {
          title: "Ventes",
          url: "/sales",
        },
        {
          title: "Stocks",
          url: "/stocks",
        },
        {
          title: "Progression",
          url: "/progression",
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
      url: "/dashboard/sellers",
      icon: UsersRound,
    },
    // {
    //   name: "Clients",
    //   url: "/dashboard/clients",
    //   icon: SquareUserRound,
    // },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EnterpriseHead />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SideBarButtonSale />
        </SidebarGroup>
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
