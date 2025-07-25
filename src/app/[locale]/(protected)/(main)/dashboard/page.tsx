import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import CalendarEvent from "@/components/dashboard/content/calendar-event";
import Greeting from "@/components/dashboard/content/greeting";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardPage = ({ params }) => {
  const { locale } = params;

  // Sample events
  const events = [
    {
      id: "1",
      date: "2025-07-25",
      title: "Grammar Workshop",
      description: "Join our grammar Q&A workshop at 18:00",
      color: "bg-emerald-300",
    },
    {
      id: "2",
      date: "2025-07-26",
      title: "Speaking Practice",
      description: "Group speaking session with native tutors",
      color: "bg-yellow-300",
    },
    {
      id: "3",
      date: "2025-07-28",
      title: "Language Club",
      description: "Group speaking session with native tutors",
      color: "bg-blue-300",
    },
    {
      id: "4",
      date: "2025-07-29",
      title: "Something Else",
      description: "Group speaking session with native tutors",
      color: "bg-indigo-300",
    },
    {
      id: "5",
      date: "2025-07-29",
      title: "Writing Essays",
      description: "Group writing essays.",
      color: "bg-red-300",
    },
    {
      id: "6",
      date: "2025-07-29",
      title: "Language Party",
      description: "Learning how to party like a real Slovene",
      color: "bg-orange-300",
    },
    {
      id: "7",
      date: "2025-07-31",
      title: "Workshop with the President",
      description: "Learning about Slovenia with a President of Slovenia",
      color: "bg-zinc-500",
    },
    {
      id: "8",
      date: "2025-07-30",
      title: "Camping in Slovene Forest",
      description: "Learning about traditional camping technics",
      color: "bg-cyan-300",
    },
    {
      id: "9",
      date: "2025-07-30",
      title: "Exploring Slovene History",
      description: "Learning about history of Slovene language",
      color: "bg-pink-300",
    },
  ];

  return (
    <main className="h-[90vh] w-full p-8">
      <Greeting />
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-stretch w-full gap-6 pb-6">
        {/* <Skeleton className="flex-1 h-80 md:h-auto w-full"> */}
        <div className="bg-none w-full md:bg-foreground/5 rounded-2xl flex justify-start items-start text-foreground/50 md:p-5 max-h-[16rem] md:max-h-[30rem] overflow-y-scroll">
          {events.length !== 0 ? (
            <ul className="flex flex-col gap-5 justify-center items-center w-full">
              {events.map((props) => (
                <li key={props.id} className="w-full">
                  <CalendarEvent locale={locale} {...props} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic">You have no event scheduled</p>
          )}
        </div>
        {/* </Skeleton> */}
        <CalendarDashboard events={events} locale={locale} />
      </div>
      <Skeleton>
        <div className="h-[19rem] w-full bg-foreground/5 rounded-2xl flex justify-center items-center text-foreground/50">
          Coming Soon
        </div>
      </Skeleton>
    </main>
  );
};

export default DashboardPage;
