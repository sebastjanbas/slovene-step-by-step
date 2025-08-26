"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { IconLogo } from "@/components/icons/icon-logo";
import { SidebarNavigationData as data } from "@/lib/docs";

const AdminSidebar = ({ locale, ...props }) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <IconLogo
                  className="!size-6"
                  fillColor="fill-white dark:fill-foreground"
                />
                <span className="text-base font-semibold">Admin</span>
              </Link>
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
};

export default AdminSidebar;
