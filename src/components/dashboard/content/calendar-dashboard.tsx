"use client";
import { Calendar } from "@/components/ui/calendar";
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

const CalendarDashboard = ({ locale }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dateFnsLocale = localeMap[locale] ?? localeMap["en"]; // fallback to English

  return (
    <div>
      <Calendar
        locale={dateFnsLocale}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border w-xl"
      />
    </div>
  );
};

export default CalendarDashboard;
