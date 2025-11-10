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

  const isWeekend = modifiers.weekend;
  const isToday = modifiers.today;
  const isSelected = modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;
  const isOutside = modifiers.outside;

  // Display up to 3 events, show +N indicator for additional events
  const displayEvents = events.slice(0, 3);
  const additionalEvents = events.length > 3 ? events.length - 3 : 0;

  return (
    <div className="relative w-full h-full group/cell">
      <Button
        ref={ref}
        variant="ghost"
        size={size}
        data-day={day.date}
        data-selected-single={isSelected}
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        className={cn(
          "size-auto cursor-pointer relative rounded-xl transition-all duration-200 ease-in-out",
          "flex aspect-square w-full flex-col items-center justify-center",
          "text-sm md:text-base font-medium leading-none",
          "hover:bg-accent/60 hover:scale-[1.02] hover:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Selected state
          isSelected && [
            "bg-primary text-primary-foreground shadow-md",
            "hover:bg-primary/90 dark:hover:bg-primary/80",
          ],
          // Today state (when not selected)
          !isSelected && isToday && [
            "bg-accent/50 dark:bg-accent/30 font-semibold",
            "ring-2 ring-primary/30 dark:ring-primary/20",
          ],
          // Weekend state
          !isSelected && !isToday && isWeekend && "bg-muted/30 dark:bg-muted/20",
          // Outside month
          isOutside && "text-muted-foreground/40",
          // Range states
          modifiers.range_middle && "bg-accent/50 text-accent-foreground rounded-none",
          modifiers.range_start && "bg-primary text-primary-foreground rounded-l-xl",
          modifiers.range_end && "bg-primary text-primary-foreground rounded-r-xl",
          // Size variations
          size === "calendarFullScreen" && "p-2 md:p-3 lg:p-4",
          defaultClassNames.day,
          className
        )}
        {...props}
      />
      {events.length > 0 && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-10",
            size === "calendarFullScreen" ? "bottom-1 md:bottom-2" : "bottom-0.5"
          )}
        >
          {displayEvents.map((event, idx) => (
            <span
              key={idx}
              title={event.title}
              className={cn(
                "rounded-full transition-all duration-200 shadow-sm",
                "group-hover/cell:scale-110",
                event.color ?? "bg-pink-500 dark:bg-pink-400",
                size === "calendarFullScreen"
                  ? "h-1.5 w-1.5 md:h-2 md:w-2"
                  : "h-1 w-1"
              )}
            />
          ))}
          {additionalEvents > 0 && (
            <span
              className={cn(
                "text-[8px] md:text-[9px] font-medium text-muted-foreground ml-0.5",
                isSelected && "text-primary-foreground/80"
              )}
            >
              +{additionalEvents}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Calendar, CalendarDayButton };
