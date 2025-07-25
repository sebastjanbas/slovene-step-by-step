"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    disabled: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              disabled
              tooltip="Create an appointment"
              className="bg-background cursor-pointer text-foreground hover:bg-background/80 active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Book a Lesson</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 cursor-pointer group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail className="text-foreground" />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  // href={item.url}
                  href={item.disabled ? "#" : item.url}
                  onClick={(e) => item.disabled && e.preventDefault()}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                  className={cn(
                    "pointer-events-auto", // or "none" if disabled
                    item.disabled &&
                      "pointer-events-none opacity-50 cursor-not-allowed"
                  )}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
