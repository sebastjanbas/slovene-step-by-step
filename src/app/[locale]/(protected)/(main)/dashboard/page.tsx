import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import Greeting from "@/components/dashboard/content/greeting";
import { db } from "@/db";
import { langClubBookingsTable, langClubTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import React from "react";

import NextEventCard from "./_components/next-event-card";

const DashboardPage = async ({ params }) => {
  const { locale } = await params;
  const { userId } = await auth();

  const events = await db
    .select({
      id: langClubTable.id,
      description: langClubTable.description,
      date: langClubTable.date,
      tutor: langClubTable.tutor,
      location: langClubTable.location,
      duration: langClubTable.duration,
      theme: langClubTable.theme,
    })
    .from(langClubBookingsTable)
    .where(eq(langClubBookingsTable.userId, userId))
    .innerJoin(
      langClubTable,
      eq(langClubBookingsTable.eventId, langClubTable.id)
    )
    .orderBy(asc(langClubTable.date));

  // Transform events for calendar display
  const calendarEvents = events.map((event) => ({
    id: event.id.toString(),
    description: event.description,
    date: event.date, // Format as YYYY-MM-DD
    title: event.theme,
    color: "bg-pink-200", // You can customize colors based on level or other criteria
  }));

  return (
    <main className="w-full h-full flex flex-col md:flex-row">
      <div className="flex-3/4 p-5 flex flex-col gap-4 justify-start items-start">
        <Greeting />
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="flex flex-col gap-4 mt-4 ">
              <NextEventCard event={event} locale={locale} />
            </div>
          ))
        ) : (
          <p>No future events</p>
        )}
      </div>
      <div className="flex-1/4 bg-[#F9F8FC] dark:bg-foreground/5 flex justify-center items-start">
        <CalendarDashboard events={calendarEvents} locale={locale} />
      </div>
    </main>
  );
};

export default DashboardPage;
