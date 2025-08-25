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
  IconUserCog,
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
import { NavMyProgress } from "./nav-progress";
import { NavSecondary } from "./nav-secondary";
import { IconLogo } from "@/components/icons/icon-logo";
import { usePathname } from "@/i18n/routing";

const data = {
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      disabled: false,
    },
    {
      title: "courses",
      url: "#",
      icon: IconBrandParsinta,
      disabled: true,
    },
    {
      title: "calendar",
      url: "/calendar",
      icon: IconCalendarWeek,
      disabled: true,
    },
    {
      title: "language-club",
      url: "/language-club",
      icon: IconClubs,
      disabled: false,
    },
    {
      title: "tutors",
      url: "/tutors",
      icon: IconUsers,
      disabled: true,
    },
    {
      title: "dayly-practice",
      url: "#",
      icon: IconFlask,
      disabled: true,
    },
  ],
  navSecondary: [
    {
      title: "settings",
      url: "/settings",
      icon: IconSettings,
      disabled: false,
    },
    {
      title: "get-help",
      url: "#",
      icon: IconHelp,
      disabled: true,
    },
  ],
  myProgress: [
    {
      name: "my-lessons",
      url: "#",
      icon: IconCalendarCheck,
      disabled: true,
    },
    {
      name: "achievements",
      url: "#",
      icon: IconTrophy,
      disabled: true,
    },
    {
      name: "progress",
      url: "#",
      icon: IconProgressCheck,
      disabled: true,
    },
  ],
  admin: [
    {
      title: "dashboard",
      url: "/admin",
      icon: IconUserCog,
      disabled: false,
    },
    {
      title: "language-club",
      url: "/admin/language-club-admin",
      icon: IconClubs,
      disabled: false,
    },
  ],
};

export function AppSidebar({
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & { locale: string }) {
  const pathname = usePathname();
  if (pathname.includes("admin")) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <IconLogo
                    className="!size-6"
                    fillColor="fill-white dark:fill-foreground"
                  />
                  <span className="text-base font-semibold">Admin</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.admin} />
          <NavSecondary
            items={data.navSecondary}
            className="mt-auto"
            locale={locale}
          />
        </SidebarContent>
      </Sidebar>
    );
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-white/5 hover:text-white dark:text-foreground"
            >
              <a href="/">
                <IconLogo
                  className="!size-6"
                  fillColor="fill-white dark:fill-foreground"
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
        <NavMyProgress items={data.myProgress} />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          locale={locale}
        />
      </SidebarContent>
    </Sidebar>
  );
}
