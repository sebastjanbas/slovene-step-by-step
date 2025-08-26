"use client";
import React, { useState } from "react";
import LangCalendar from "./lang-calendar";
import LangCard from "./lang-card";
import SuccessDialog from "./success-dialog";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const LangComponents = ({ events, calendarEvents, locale, bookedEvent }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const filteredEvents = events.filter((event) => {
    if (!date) return false;
    // Convert both dates to Europe/Ljubljana timezone for comparison
    const eventDateInLjubljana = event.date.toLocaleDateString("en-CA", {
      timeZone: "Europe/Ljubljana",
    });
    const selectedDateInLjubljana = date.toLocaleDateString("en-CA", {
      timeZone: "Europe/Ljubljana",
    });
    return eventDateInLjubljana === selectedDateInLjubljana;
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(!!bookedEvent);
  const t = useTranslations("dashboard.events");

  return (
    <>
      <div className="w-full h-full object-contain flex justify-center items-start">
        <LangCalendar
          events={calendarEvents}
          locale={locale}
          date={date}
          setDate={setDate}
        />
      </div>
      <div
        className={cn(
          "md:overflow-y-scroll md:max-h-[90vh] w-full flex gap-5 pt-5 max-w-lg 3xl:max-w-xl flex-col items-center justify-start"
        )}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <LangCard event={event} locale={locale} key={event.id} />
          ))
        ) : (
          <p>
            {t("no-events", {
              date: date.toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
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
