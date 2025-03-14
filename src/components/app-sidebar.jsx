"use client";

import * as React from "react";
import { Settings2 } from "lucide-react";

import { GoVideo } from "react-icons/go";
import { RxPencil2 } from "react-icons/rx";
import { TiSpanner } from "react-icons/ti";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./icons/Logo";
import { useAuth } from "./auth/AuthProvider";
import Link from "next/link";
import { ThemButton } from "./ui/ApearanceSwitchButton";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Video Lectures",
      url: "/courses",
      icon: GoVideo,
      isActive: true,
      items: [
        {
          title: "Theme1",
          url: "/courses",
        },
        {
          title: "Theme2",
          url: "#",
        },
        {
          title: "Theme3",
          url: "#",
        },
      ],
    },
    {
      title: "Excercises",
      url: "#",
      icon: RxPencil2,
      items: [
        {
          title: "Topic1",
          url: "#",
        },
        {
          title: "Topic2",
          url: "#",
        },
        {
          title: "Topic3",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Video settings",
          url: "#",
        },
        {
          title: "Excercise settigns",
          url: "#",
        },
        {
          title: "User settings",
          url: "/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Course Management",
      url: "/management",
      icon: TiSpanner,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, admin } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-row justify-start items-center gap-1">
          <Link href={"/dashboard"}>
            <div className="h-fit w-fit scale-75 -translate-x-1 p-2 bg-transparent border-gray-400/50 border-[1px] rounded-xl flex justify-center items-center">
              <Logo className="size-6" />
            </div>
          </Link>
          <div className="truncate">
            <h4 className="text-sm">Slovene Step By Step</h4>
            <h3 className="text-xs text-gray-400">Learning platform</h3>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {admin && <NavProjects projects={data.projects} />}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-[2px]">
          <ThemButton />
        </div>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
