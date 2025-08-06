"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { enUS, it, Locale, ru, sl } from "date-fns/locale";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard.calendar");
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
        <DialogContent className="bg-white dark:bg-foreground/5 rounded-2xl p-4">
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
                <li
                  key={event.id}
                  className="relative flex items-center justify-start bg-foreground/5 rounded-lg p-2 w-full min-h-24 h-full"
                >
                  <div
                    className={cn(
                      "absolute bottom-1/2 translate-y-1/2 left-2 h-16 w-1 rounded-full",
                      event.color
                    )}
                  />
                  <div className="absolute top-2 right-4 text-xs font-medium italic text-foreground/50 flex flex-col gap-1">
                    <span className="text-foreground">Language Club</span>
                  </div>
                  <div className="pl-6 w-full">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <div className="flex flex-row justify-end items-center pr-2 w-full">
                      <span className="text-foreground/50 text-sm">
                        {toZonedTime(
                          event.date,
                          "Europe/Ljubljana"
                        ).toLocaleTimeString(locale, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
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
