"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  // useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Icon } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function NavMyProgress({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
    disabled: boolean;
  }[];
}) {
  const t = useTranslations("dashboard.sidebar.my-progress");
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        {t("title")} <span className="pl-5 opacity-50 italic">Coming Soon</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
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
                className={cn(
                  "pointer-events-auto", // or "none" if disabled
                  item.disabled &&
                    "pointer-events-none opacity-50 cursor-not-allowed"
                )}
              >
                <item.icon />
                <span>{t(item.name)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
