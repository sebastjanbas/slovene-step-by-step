"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemButton } from "@/components/ui/appearance-switch-button";
import LanguageSwitcher from "@/components/content/navbar/language-switcher";
import { useTranslations } from "next-intl";

export function NavSecondary({
  items,
  locale,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
  locale: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const t = useTranslations("dashboard.sidebar.secondary");
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
                <Link href={item.url}>
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
