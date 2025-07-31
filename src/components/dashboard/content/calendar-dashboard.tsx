"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { enUS, it, Locale, ru, sl } from "date-fns/locale";
import React, { useState } from "react";

export const localeMap: Record<string, Locale> = {
  en: {
    ...enUS,
    options: {
      ...enUS.options,
      weekStartsOn: 1,
    },
  },
  sl: {
    ...sl,
    options: {
      ...sl.options,
      weekStartsOn: 1,
    },
  },
  it: {
    ...it,
    options: {
      ...it.options,
      weekStartsOn: 1,
    },
  },
  ru: {
    ...ru,
    options: {
      ...ru.options,
      weekStartsOn: 1,
    },
  },
};

const CalendarDashboard = ({ locale, events }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dateFnsLocale = localeMap[locale] ?? localeMap["en"]; // fallback to English

  const [isModalOpen, setModalOpen] = useState(false);

  const eventsOnSelectedDay = events.filter((event) =>
    date ? isSameDay(new Date(event.date), date) : false
  );

  const handleDayClick = (date: Date) => {
    setDate(date);
    setModalOpen(true);
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        events={events}
        locale={dateFnsLocale}
        modifiers={{
          hasEvent: events.map((e) => new Date(e.date)),
          weekend: (date) => {
            const day = date.getDay();
            return day === 0 || day === 6; // Sunday (0) or Saturday (6)
          },
        }}
        modifiersClassNames={{
          hasEvent: "relative has-event",
        }}
        className="rounded-2xl bg-transparent p-4 w-full md:w-fit h-auto pb-14 md:pb-4"
      />

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Events on {date ? format(date, "PPP") : ""}
            </DialogTitle>
          </DialogHeader>

          {eventsOnSelectedDay.length === 0 ? (
            <p>No events for this day.</p>
          ) : (
            <ul className="space-y-2">
              {eventsOnSelectedDay.map((event) => (
                <li
                  key={event.id}
                  className="relative flex items-center justify-start"
                >
                  <div
                    className={cn(
                      "absolute bottom-1/2 translate-y-1/2 left-2 h-10 w-1 rounded-full",
                      event.color
                    )}
                  />
                  <div className="translate-x-6">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarDashboard;
