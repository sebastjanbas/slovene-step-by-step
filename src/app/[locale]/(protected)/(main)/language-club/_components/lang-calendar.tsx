"use client";
import { localeMap } from "@/components/dashboard/content/calendar-dashboard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarDayButton,
  CalendarEvent,
} from "@/components/ui/calendar";
import React, { useState } from "react";

const LangCalendar = ({ locale, events, date, setDate }) => {
  const dateFnsLocale = localeMap[locale] ?? localeMap["en"]; // fallback to English
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  const eventMap: Record<string, CalendarEvent[]> = events.reduce(
    (acc, event) => {
      const dateKey = event.date;
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, CalendarEvent[]>
  );
  return (
    <>
      {/*   FIX THE BUG WHERE IF YOU DOUBLE CLICK ON THE BUTTON YOU GET AN UNDEFINED     */}
      <Calendar
        locale={dateFnsLocale}
        events={events}
        selected={date}
        onSelect={setDate}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        mode="single"
        modifiers={{
          hasEvent: events.map((e) => new Date(e.date)),
          weekend: (date) => {
            const day = date.getDay();
            return day === 0 || day === 6; // Sunday (0) or Saturday (6)
          },
        }}
        components={{
          DayButton: (props) => (
            <CalendarDayButton
              size="calendarFullScreen"
              eventMap={eventMap}
              {...props}
            />
          ),
        }}
        modifiersClassNames={{
          hasEvent: "relative has-event",
        }}
        className="rounded-none bg-white dark:bg-background p-4 max-w-5xl w-full"
      />

      <Button
        size="sm"
        className="absolute top-3.5 left-14 md:left-20"
        onClick={() => {
          setDate(today);
          setCurrentMonth(today);
        }}
      >
        Today
      </Button>
    </>
  );
};

export default LangCalendar;
