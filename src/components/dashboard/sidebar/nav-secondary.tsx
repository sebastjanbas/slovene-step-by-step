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
import { ThemButton } from "@/components/ui/appearance-switch-button";
import LanguageSwitcher from "@/components/content/navbar/language-switcher";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/routing";

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
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem className="flex flex-col items-start gap-2 justify-start">
            <SidebarMenuButton asChild>
              <ThemButton className="rounded-lg w-fit" />
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <LanguageSwitcher className="rounded-lg w-fit" locale={locale} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          {items.map((item) => {
            const isActive =
              !item.disabled &&
              (pathname === item.url || pathname.startsWith(item.url + "/"));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={t(item.title)}
                  isActive={isActive}
                  className={cn(
                    "group relative cursor-pointer rounded-lg transition-all duration-200",
                    "hover:bg-[var(--sidebar-accent-hover)]",
                    isActive &&
                      "bg-[var(--sidebar-accent-active)] text-[var(--sidebar-indicator)] font-medium shadow-sm",
                    item.disabled &&
                      "pointer-events-none opacity-50 cursor-not-allowed",
                  )}
                  style={
                    isActive
                      ? {
                          color: "var(--sidebar-indicator)",
                        }
                      : {}
                  }
                >
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.disabled ? "#" : (item.url as any)}
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
                    className="flex items-center gap-3"
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "size-4 shrink-0 transition-colors",
                          isActive
                            ? "text-[var(--sidebar-indicator)]"
                            : "text-sidebar-foreground/60",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "flex-1 text-sm transition-colors",
                        isActive
                          ? "text-[var(--sidebar-indicator)]"
                          : "text-sidebar-foreground",
                      )}
                    >
                      {t(item.title)}
                    </span>
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full shadow-sm"
                        style={{
                          backgroundColor: "var(--sidebar-indicator)",
                        }}
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
