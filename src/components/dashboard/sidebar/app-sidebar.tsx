"use client";

import * as React from "react";
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
import { NavMyProgress } from "./nav-progress";
import { NavSecondary } from "./nav-secondary";
import { IconLogo } from "@/components/icons/icon-logo";
import { SidebarNavigationData as data } from "@/lib/docs";

export function AppSidebar({
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & { locale: string }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/50 px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default pointer-events-none justify-start gap-3 px-3 h-auto py-2.5 hover:bg-transparent"
            >
              <div
                className="flex items-center justify-center size-8 rounded-lg text-white shadow-sm"
                style={{
                  background: "var(--sidebar-icon-gradient)",
                }}
              >
                <IconLogo className="size-5" fillColor="fill-white" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-xs font-semibold leading-none text-sidebar-foreground/90">
                  STUDENT
                </span>
                <span className="text-[10px] font-medium leading-none text-sidebar-foreground/60 truncate max-w-[180px]">
                  Slovenščina Korak za Korakom
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain items={data.navMain} />
        <NavMyProgress items={data.myProgress} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 px-2 py-3">
        <NavSecondary items={data.navSecondary} locale={locale} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
