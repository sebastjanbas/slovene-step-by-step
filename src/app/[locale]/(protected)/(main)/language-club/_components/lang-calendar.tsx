"use client";
import { localeMap } from "@/components/dashboard/content/calendar-dashboard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarDayButton,
  CalendarEvent,
} from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IconHome } from "@tabler/icons-react";

const LangCalendar = ({ locale, events, date, setDate }) => {
  const dateFnsLocale = localeMap[locale] ?? localeMap["en"]; // fallback to English
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const t = useTranslations("dashboard.calendar");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, [screenWidth]);

  const eventMap: Record<string, CalendarEvent[]> = events.reduce(
    (acc, event) => {
      const dateKey = event.date.toLocaleDateString("en-CA", {
        timeZone: "Europe/Ljubljana",
      });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, CalendarEvent[]>
  );
  return (
    <div className="relative w-full h-full">
      <>
        {/*   FIX THE BUG WHERE IF YOU DOUBLE CLICK ON THE BUTTON YOU GET AN UNDEFINED     */}
        <Calendar
          locale={dateFnsLocale}
          events={events}
          selected={date}
          onSelect={(newDate) => {
            // Ensure we always have a valid date, fallback to today if undefined
            setDate(newDate || new Date());
          }}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          mode="single"
          modifiers={{
            hasEvent: events.map((e) => {
              // Convert event date to Europe/Ljubljana timezone for consistent display
              const eventDateInLjubljana = new Date(
                e.date.toLocaleDateString("en-CA", {
                  timeZone: "Europe/Ljubljana",
                })
              );
              return eventDateInLjubljana;
            }),
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
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: screenHeight * 0.11,
                }}
              />
            ),
          }}
          modifiersClassNames={{
            hasEvent: "relative has-event",
          }}
          className="rounded-none bg-transparent dark:bg-background p-4 w-full h-full"
        />

        <Button
          size={screenWidth < 450 ? "icon" : "sm"}
          className="absolute top-3.5 left-12 sm:left-20"
          onClick={() => {
            setDate(today);
            setCurrentMonth(today);
          }}
        >
          {screenWidth < 450 ? <IconHome /> : t("today-button")}
        </Button>
      </>
    </div>
  );
};

export default LangCalendar;
