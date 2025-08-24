"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isSameDay } from "date-fns";
import { enUS, it, Locale, ru, sl } from "date-fns/locale";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import EventViewCalendar from "@/app/[locale]/(protected)/(main)/dashboard/_components/event-view-card";

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
  const t = useTranslations("dashboard.events");
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
        classNames={{
          day: "h-full w-full !aspect-square",
        }}
        className="rounded-2xl bg-transparent p-4 w-full h-fit pb-14"
      />

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="bg-white dark:bg-background rounded-2xl !max-w-xl"
        >
          <DialogHeader>
            <DialogTitle>
              {t("event-on", {
                date: date.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              })}
            </DialogTitle>
            <DialogDescription>
              Manage your bookings and reschedule events.
            </DialogDescription>
          </DialogHeader>

          {eventsOnSelectedDay.length === 0 ? (
            <p className="text-center text-sm text-foreground/50">
              {t("no-events", {
                date: date.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              })}
            </p>
          ) : (
            <ul className="space-y-2">
              {eventsOnSelectedDay.map((event) => (
                <EventViewCalendar
                  key={event.id}
                  event={event}
                  locale={locale}
                />
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarDashboard;
