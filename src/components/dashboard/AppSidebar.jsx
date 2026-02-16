"use client"

import * as React from "react"
import {
  Settings2,
} from "lucide-react"
import { MdDashboard } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { TeamSwitcher } from "./TeamSwitcher"

// This is sample data.
const data = {
  user: {
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: MdDashboard,
      isActive: true,
      items: [
        {
          title: "My Profile",
          url: "/dashboard/my-profile",
        },
        {
          title: "My Trips",
          url: "/dashboard/my-trips",
        },
        {
          title: "Wishlist",
          url: "/dashboard/wishlist",
        },
      ],
    },

    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
