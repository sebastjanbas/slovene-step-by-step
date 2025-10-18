import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import Greeting from "@/components/dashboard/content/greeting";
import { db } from "@/db";
import { langClubBookingsTable, langClubTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, eq, and, or } from "drizzle-orm";
import React from "react";

import DashboardClient from "./_components/dashboard-client";

const DashboardPage = async ({ params }) => {
  const { locale } = await params;
  const { userId } = await auth();

  const events = await db
    .select({
      id: langClubTable.id,
      description: langClubTable.description,
      date: langClubTable.date,
      tutor: langClubTable.tutor,
      level: langClubTable.level,
      location: langClubTable.location,
      duration: langClubTable.duration,
      theme: langClubTable.theme,
      bookingId: langClubBookingsTable.id,
      bookingStatus: langClubBookingsTable.status,
    })
    .from(langClubBookingsTable)
    .where(
      and(
        eq(langClubBookingsTable.userId, userId),
        or(
          eq(langClubBookingsTable.status, "paid"),
          eq(langClubBookingsTable.status, "booked")
        )
      )
    )
    .innerJoin(
      langClubTable,
      eq(langClubBookingsTable.eventId, langClubTable.id)
    )
    .orderBy(asc(langClubTable.date));

  return (
    <main className="w-full h-full flex flex-col md:flex-row">
      <div className="flex-3/4 pl-5 py-5 flex flex-col gap-4 justify-start items-start h-full">
        <Greeting />
        <DashboardClient events={events} locale={locale} />
      </div>
      <div className="flex-1/4 bg-[#F9F8FC] dark:bg-foreground/5 flex justify-center items-start h-full rounded-b-2xl">
        <CalendarDashboard events={events} locale={locale} />
      </div>
    </main>
  );
};

export default DashboardPage;
