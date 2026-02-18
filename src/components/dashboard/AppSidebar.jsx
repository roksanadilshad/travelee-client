"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react"

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
import { MdDashboard } from "react-icons/md"
import { useAuth } from "@/hooks/useAuth"



export function AppSidebar({ ...props }) {


  const { user } = useAuth();
  if (!user) return null;

console.log(user);


  // This is sample data.
  const data = {
    user: {
      name: user?.name,
      email: user?.email,
      avatar: user?.image
        ? user?.image
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: MdDashboard,
        isActive: true,
        items: [
          {
            title: "My profile",
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
  );
}
