import { redirect } from "@/i18n/routing";
import { checkRole } from "@/utils/roles";
import React from "react";

const MainProtectedLayout = async ({ params, children }) => {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");
  const { locale } = await params;
  if (isAdmin || isModerator) {
    redirect({ href: "/admin", locale });
    return null;
  }
  return <div>{children}</div>;
};

export default MainProtectedLayout;
