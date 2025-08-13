import { redirect } from "@/i18n/routing";
import { checkRole } from "@/utils/roles";
import React from "react";

const AdminLayout = async ({ children, params }) => {
  const isAdmin = await checkRole("admin");
  const { locale } = await params;
  if (!isAdmin) {
    redirect({ href: "/dashboard", locale });
    return null;
  }
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default AdminLayout;
