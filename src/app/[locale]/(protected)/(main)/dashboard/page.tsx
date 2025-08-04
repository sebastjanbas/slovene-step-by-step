import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import Greeting from "@/components/dashboard/content/greeting";
import { db } from "@/db";
import { langClubBookingsTable, langClubTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import React from "react";
import { toZonedTime } from "date-fns-tz";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconCalendar } from "@tabler/icons-react";
import { ExternalLink } from "lucide-react";

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
              <Card className="w-full max-w-md mx-auto min-w-sm">
                <CardHeader className="text-center text-2xl font-medium tracking-tight">
                  <CardTitle>Your next event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <IconCalendar className="w-4 h-4" />
                      <span>
                        {toZonedTime(
                          event.date,
                          "Europe/Ljubljana"
                        ).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="font-medium">{event.theme}</p>
                    <p className="text-sm text-muted-foreground">
                      with {event.tutor}
                    </p>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Location:{" "}
                      <span className="inline-flex items-center gap-1">
                        {event.location} <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                    <p>Duration: {event.duration} minutes</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
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
