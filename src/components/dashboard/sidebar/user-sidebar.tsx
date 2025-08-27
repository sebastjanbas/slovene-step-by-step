"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { Link } from "@/i18n/routing";
import { NavMain } from "./nav-main";
import { NavMyProgress } from "./nav-progress";
import { NavSecondary } from "./nav-secondary";
import { IconLogo } from "@/components/icons/icon-logo";
import { SidebarNavigationData as data } from "@/lib/docs";

const UserSidebar = ({ locale, ...props }) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconLogo className="!size-6" />
                <span className="text-base font-semibold">
                  Slovenščina Korak za Korakom
                </span>
              </Link>
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
};

export default UserSidebar;
