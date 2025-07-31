import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import Greeting from "@/components/dashboard/content/greeting";
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
    <main className="w-full h-full flex flex-col md:flex-row">
      <div className="flex-3/4 p-5">
        <Greeting />
      </div>
      <div className="flex-1/4 bg-[#F9F8FC] dark:bg-foreground/5 flex justify-center items-start">
        <CalendarDashboard events={events} locale={locale} />
      </div>
    </main>
  );
};

export default DashboardPage;
