import * as React from "react";

import { Sidebar } from "@/components/ui/sidebar";
import { checkRole } from "@/utils/roles";
import UserSidebar from "./user-sidebar";
import AdminSidebar from "./admin-sidebar";

export async function AppSidebar({
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & { locale: string }) {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  return (
    <>
      {isAdmin || isModerator ? (
        <AdminSidebar locale={locale} {...props} />
      ) : (
        <UserSidebar locale={locale} {...props} />
      )}
    </>
  );
}
