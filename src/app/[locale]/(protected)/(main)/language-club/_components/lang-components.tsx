"use client";
import React, { useState } from "react";
import LangCalendar from "./lang-calendar";
import LangCard from "./lang-card";
import SuccessDialog from "./success-dialog";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const LangComponents = ({ events, calendarEvents, locale, bookedEvent }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const filteredEvents = events.filter((event) => {
    const selectedDate = date.toLocaleDateString("sv-SE"); // Local, correct timezone
    return event.date === selectedDate;
  });

  const { open } = useSidebar();
  const [showSuccessDialog, setShowSuccessDialog] = useState(!!bookedEvent);

  return (
    <>
      <div className="w-[100%] md:w-full md:max-w-4xl flex justify-center items-start">
        <LangCalendar
          events={calendarEvents}
          locale={locale}
          date={date}
          setDate={setDate}
        />
      </div>
      <div
        className={cn(
          "md:overflow-y-scroll md:max-h-[90vh] w-full flex justify-center items-center gap-5 pt-5",
          !open
            ? "flex-row flex-wrap h-fit space-y-0"
            : "max-w-lg flex-col items-center justify-start"
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

      {bookedEvent && (
        <SuccessDialog
          event={bookedEvent}
          locale={locale}
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        />
      )}
    </>
  );
};

export default LangComponents;
