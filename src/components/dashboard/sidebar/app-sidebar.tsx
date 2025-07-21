"use client";

import * as React from "react";
import {
  IconBrandParsinta,
  IconCalendarCheck,
  IconCalendarWeek,
  IconClubs,
  IconDashboard,
  IconDotsVertical,
  IconFlask,
  IconHelp,
  IconProgressCheck,
  IconSettings,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { IconLogo } from "@/components/icons/icon-logo";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfo } from "../auth/UserContext";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      disabled: false,
    },
    {
      title: "Courses",
      url: "#",
      icon: IconBrandParsinta,
      disabled: true,
    },
    {
      title: "Calendar",
      url: "#",
      icon: IconCalendarWeek,
      disabled: false,
    },
    {
      title: "Language Club",
      url: "#",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "Tutors",
      url: "#",
      icon: IconUsers,
      disabled: false,
    },
    {
      title: "Daily Practice",
      url: "#",
      icon: IconFlask,
      disabled: true,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  myProgress: [
    {
      name: "My Lessons",
      url: "#",
      icon: IconCalendarCheck,
      disabled: true,
    },
    {
      name: "Achievements",
      url: "#",
      icon: IconTrophy,
      disabled: true,
    },
    {
      name: "Progress",
      url: "#",
      icon: IconProgressCheck,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserInfo();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconLogo className="!size-6" fillColor="fill-foreground" />
                <span className="text-base font-semibold">
                  Slovenščina Korak za Korakom
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.myProgress} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!user ? (
          <Skeleton>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg bg-foreground/30" />
              <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                <div className="w-24 h-3 bg-foreground/30" />
                <div className="w-full h-2 bg-foreground/15" />
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </Skeleton>
        ) : (
          <NavUser user={user} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
