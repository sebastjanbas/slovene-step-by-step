"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  IconCalendar,
  IconUsers,
  IconUser,
  IconCheck,
} from "@tabler/icons-react";

interface LangClubEvent {
  id: number;
  date: Date;
  bookingStatus: string;
}

interface PersonalSession {
  id: number;
  startTime: Date;
  status: string;
}

interface DashboardStatsProps {
  langClubEvents: LangClubEvent[];
  personalSessions: PersonalSession[];
}

const DashboardStats = ({
  langClubEvents,
  personalSessions,
}: DashboardStatsProps) => {
  const t = useTranslations("dashboard.stats");
  const now = new Date();

  // Calculate stats
  const upcomingLangClub = langClubEvents.filter(
    (event) => new Date(event.date) > now,
  ).length;

  const upcomingPersonal = personalSessions.filter(
    (session) => new Date(session.startTime) > now,
  ).length;

  const totalUpcoming = upcomingLangClub + upcomingPersonal;

  const completedLangClub = langClubEvents.filter(
    (event) => new Date(event.date) <= now,
  ).length;

  const completedPersonal = personalSessions.filter(
    (session) => new Date(session.startTime) <= now,
  ).length;

  const totalCompleted = completedLangClub + completedPersonal;

  const stats = [
    {
      title: t("total-upcoming"),
      value: totalUpcoming,
      icon: IconCalendar,
      borderColor: "border-l-[var(--sl-blue)]",
      textColor: "text-[var(--sl-blue)]",
      iconBgColor: "bg-[var(--sl-blue)]",
      description: t("description.upcoming"),
    },
    {
      title: t("language-club"),
      value: upcomingLangClub,
      icon: IconUsers,
      borderColor: "border-l-[var(--sl-purple)]",
      textColor: "text-[var(--sl-purple)]",
      iconBgColor: "bg-[var(--sl-purple)]",
      description: t("description.language-club"),
    },
    {
      title: t("personal-sessions"),
      value: upcomingPersonal,
      icon: IconUser,
      borderColor: "border-l-[var(--sl-pink)]",
      textColor: "text-[var(--sl-pink)]",
      iconBgColor: "bg-[var(--sl-pink)]",
      description: t("description.personal-sessions"),
    },
    {
      title: t("completed"),
      value: totalCompleted,
      icon: IconCheck,
      borderColor: "border-l-[var(--sl-purple)]",
      textColor: "text-[var(--sl-purple)]",
      iconBgColor: "bg-[var(--sl-purple)]",
      description: t("description.completed"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`bg-white dark:bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl ${stat.borderColor} border-l-4`}
          >
            <CardContent className="p-5">
              <div className="flex flex-row items-start justify-between mb-4">
                <h3
                  className={`text-sm font-medium ${stat.textColor} opacity-90 dark:opacity-80`}
                >
                  {stat.title}
                </h3>
                <div
                  className={`${stat.iconBgColor} p-2.5 rounded-lg flex-shrink-0`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className={`text-3xl font-bold ${stat.textColor} opacity-100 dark:opacity-90`}
                >
                  {stat.value}
                </div>
                <p
                  className={`text-sm ${stat.textColor} opacity-70 dark:opacity-60`}
                >
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
