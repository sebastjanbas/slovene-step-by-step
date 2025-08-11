"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemButton } from "@/components/ui/appearance-switch-button";
import LanguageSwitcher from "@/components/content/navbar/language-switcher";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function NavSecondary({
  items,
  locale,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
    disabled: boolean;
  }[];
  locale: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const t = useTranslations("dashboard.sidebar.secondary");
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="pl-[5px] flex flex-col items-start gap-2 justify-start">
            <ThemButton />
            <LanguageSwitcher locale={locale} />
          </SidebarMenuItem>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.disabled ? "#" : item.url}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                      return;
                    }
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                  className={cn(
                    "pointer-events-auto", // or "none" if disabled
                    item.disabled &&
                      "pointer-events-none opacity-50 cursor-not-allowed"
                  )}
                >
                  <item.icon />
                  <span>{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
