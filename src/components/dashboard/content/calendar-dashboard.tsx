"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, isSameDay } from "date-fns";
import { enUS, it, Locale, ru, sl } from "date-fns/locale";
import React, { useState } from "react";

const localeMap: Record<string, Locale> = {
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

// Sample events
const events = [
  {
    id: "1",
    date: "2025-07-25",
    title: "Grammar Workshop",
    description: "Join our grammar Q&A workshop at 18:00",
    color: "bg-emerald-400",
  },
  {
    id: "2",
    date: "2025-07-26",
    title: "Speaking Practice",
    description: "Group speaking session with native tutors",
    color: "bg-yellow-400",
  },
  {
    id: "3",
    date: "2025-07-26",
    title: "Speaking Practice",
    description: "Group speaking session with native tutors",
    color: "bg-blue-400",
  },
];

const CalendarDashboard = ({ locale }) => {
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
        className="rounded-md border p-4"
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
                <li key={event.id} className={event.color}>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
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
