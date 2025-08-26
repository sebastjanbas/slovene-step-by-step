"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export type CalendarEvent = {
  id: string;
  date: Date;
  title: string;
  color: string; // Tailwind class or hex like "bg-red-500" or "#ff0000"
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  events = [],
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  events?: CalendarEvent[];
}) {
  const defaultClassNames = getDefaultClassNames();

  // Group events by date in Europe/Ljubljana timezone (e.g. "2025-07-22")
  const eventMap: Record<string, CalendarEvent[]> = events.reduce(
    (acc, event) => {
      // Use Europe/Ljubljana timezone for consistent date grouping
      const dateKey = event.date.toLocaleDateString("en-CA", {
        timeZone: "Europe/Ljubljana",
      }); // YYYY-MM-DD format in Ljubljana timezone
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, CalendarEvent[]>
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-xl",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-2xl text-dark-2 font-medium"
            : "rounded-xl pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-xl flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex gap-2 w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 [&:first-child[data-selected=true]_button]:rounded-l-xl [&:last-child[data-selected=true]_button]:rounded-r-xl group/day aspect-auto select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-[#F5E9FA] dark:bg-foreground/20 text-accent-foreground rounded-xl data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground opacity-75 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: (props) => (
          <CalendarDayButton {...props} eventMap={eventMap} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  size = "calendar",
  eventMap,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  eventMap: Record<string, CalendarEvent[]>;
} & {
  size?: "default" | "sm" | "lg" | "calendar" | "icon" | "calendarFullScreen";
}) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const dateKey = day.date.toLocaleDateString("en-CA", {
    timeZone: "Europe/Ljubljana",
  });
  const events = eventMap[dateKey] || [];

  const weekendClass = modifiers.weekend
    ? "bg-[#EAE9F7]/40 dark:bg-foreground/10"
    : "";

  return (
    <>
      <Button
        ref={ref}
        variant="ghost"
        size={size}
        data-day={day.date}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        className={cn(
          "size-auto cursor-pointer relative rounded-xl data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square  w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-xl data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-xl data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
          size === "calendarFullScreen"
            ? "sm:justify-start sm:items-start p-3 sm:p-5 data-[selected-single=true]:bg-primary/70 dark:data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground"
            : "",
          weekendClass,
          defaultClassNames.day,
          className
        )}
        {...props}
      />
      {events.length > 0 && (
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 flex mt-1 cursor-pointer z-10",
            size === "calendarFullScreen" ? "gap-1" : "gap-0.5"
          )}
        >
          {events.map((event, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 w-4 rounded-full",
                event.color ?? "bg-pink-200",
                size === "calendarFullScreen"
                  ? "h-1.5 w-4 md:w-8 md:h-3"
                  : "h-1.5 w-4"
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}

export { Calendar, CalendarDayButton };
