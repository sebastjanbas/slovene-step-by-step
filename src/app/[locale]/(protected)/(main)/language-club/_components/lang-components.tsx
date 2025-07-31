"use client";
import React, { useState } from "react";
import LangCalendar from "./lang-calendar";
import LangCard from "./lang-card";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const LangComponents = ({ events, locale }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const filteredEvents = events.filter((event) => {
    const selectedDate = date.toLocaleDateString("sv-SE"); // Local, correct timezone
    return event.date === selectedDate;
  });

  const { open } = useSidebar();

  return (
    <>
      <div className="w-full max-w-4xl">
        <div className="relative w-full flex items-start justify-center h-full">
          <LangCalendar
            events={events}
            locale={locale}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
      <div
        className={cn(
          "overflow-y-scroll overflow-x-hidden max-h-[90vh] flex justify-center items-center gap-5",
          !open
            ? "w-full flex-row flex-wrap h-fit space-y-0"
            : "w-full max-w-lg flex-col items-center justify-start"
        )}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <LangCard event={event} locale={locale} key={event.id} />
          ))
        ) : (
          <p>
            No events scheduled on{" "}
            {date.toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </>
  );
};

export default LangComponents;
