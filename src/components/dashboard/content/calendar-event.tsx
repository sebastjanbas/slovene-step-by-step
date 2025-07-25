import { CalendarEvent as CalendarEventType } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";
import React from "react";

const CalendarEvent = ({
  date,
  title,
  color,
  locale,
}: CalendarEventType & { locale: string }) => {
  return (
    <div className="relative grid grid-rows-1 grid-cols-2 md:grid-cols-4 text-start py-3 px-6 h-20 w-full border-foreground/5 border-1 md:border-none md:shadow-lg bg-background rounded-2xl">
      <div
        className={cn(
          "absolute left-4 md:left-8 bottom-1/2 translate-y-1/2 h-10 w-1 rounded-full",
          color
        )}
      ></div>
      <span className="flex items-center translate-x-4 md:translate-x-8">
        {title}
      </span>
      <span className="flex justify-center items-center md:translate-x-8">
        {new Date(date).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <div className="absolute right-4 md:right-8 bottom-1/2 translate-y-1/2">
        <IconDotsVertical />
      </div>
    </div>
  );
};

export default CalendarEvent;
