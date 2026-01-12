"use client";
import React, { useState } from "react";
import LangCalendar from "./lang-calendar";
import LangCard from "./lang-card";
import SuccessDialog from "./success-dialog";
import { useTranslations } from "next-intl";
import { IconCalendar, IconCalendarEvent } from "@tabler/icons-react";

const LangComponents = ({ events, calendarEvents, locale, bookedEvent }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const filteredEvents = events.filter((event) => {
    if (!date) return false;
    // Convert both dates to Europe/Ljubljana timezone for comparison
    const eventDateInLjubljana = event.date.toLocaleDateString("en-CA", {
      timeZone: "Europe/Ljubljana",
    });
    const selectedDateInLjubljana = date.toLocaleDateString("en-CA", {
      timeZone: "Europe/Ljubljana",
    });
    return eventDateInLjubljana === selectedDateInLjubljana;
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(!!bookedEvent);
  const t = useTranslations("dashboard.language-club");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Page Header */}
      <div className="px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 sm:px-8 lg:px-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
            {/* Calendar Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="bg-background/50 dark:bg-background/30 rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 lg:p-10 overflow-hidden">
                <LangCalendar
                  events={calendarEvents}
                  locale={locale}
                  date={date}
                  setDate={setDate}
                />
              </div>
            </div>

            {/* Events Section */}
            <div className="w-full lg:w-96 xl:w-[28rem] flex flex-col min-h-0">
              <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-20 lg:pb-0">
                {filteredEvents.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <IconCalendarEvent className="h-4 w-4" />
                      <span>
                        {t("events-for-date", {
                          date: (date || new Date()).toLocaleDateString(locale, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }),
                        })}
                      </span>
                    </div>
                    {filteredEvents.map((event) => (
                      <LangCard event={event} locale={locale} key={event.id} />
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-background/50 dark:bg-background/30 rounded-2xl border border-border/50">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <IconCalendar className="w-8 h-8 text-muted-foreground/60" />
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-2">
                      {t("no-events-scheduled")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("no-events-description")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {bookedEvent && (
        <SuccessDialog
          event={bookedEvent}
          locale={locale}
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        />
      )}
    </div>
  );
};

export default LangComponents;
