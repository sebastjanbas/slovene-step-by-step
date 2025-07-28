"use client";

import * as React from "react";
import {
  IconBrandParsinta,
  IconCalendarCheck,
  IconCalendarWeek,
  IconClubs,
  IconDashboard,
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { IconLogo } from "@/components/icons/icon-logo";

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
      url: "/calendar",
      icon: IconCalendarWeek,
      disabled: true,
    },
    {
      title: "Language Club",
      url: "/language-club",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "Tutors",
      url: "/tutors",
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
  // const user = useUserInfo();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent hover:text-background dark:text-foreground"
            >
              <a href="#">
                <IconLogo
                  className="!size-6"
                  fillColor="fill-background dark:fill-foreground"
                />
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
    </Sidebar>
  );
}
