import { redirect } from "@/i18n/routing";
import { checkRole } from "@/utils/roles";
import React from "react";

const AdminLayout = async ({ children, params }) => {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");
  const { locale } = await params;
  if (!isAdmin && !isModerator) {
    redirect({ href: "/dashboard", locale });
    return null;
  }
  return <div className="flex flex-col gap-2 w-full h-full">{children}</div>;
};

export default AdminLayout;
