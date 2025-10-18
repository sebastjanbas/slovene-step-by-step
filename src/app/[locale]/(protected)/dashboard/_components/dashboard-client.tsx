"use client";
import React, { useState } from "react";
import NextEventCard from "./next-event-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EventViewCalendar from "./event-view-card";
import { useTranslations } from "next-intl";

interface Event {
  id: number;
  description: string;
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  theme: string;
  bookingId: number;
  bookingStatus: string;
}

interface DashboardClientProps {
  events: Event[];
  locale: string;
}

const DashboardClient = ({ events, locale }: DashboardClientProps) => {
  const now = new Date();
  const futureEvents = events.filter((event) => new Date(event.date) > now);
  const t = useTranslations("dashboard.all-scheduled-events");
  return (
    <>
      {futureEvents.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          <NextEventCard event={futureEvents[0]} locale={locale} />
        </div>
      ) : (
        <p>{t("no-future-events")}</p>
      )}
      <div className="inline-flex gap-2 w-full items-center overflow-hidden">
        <p className="text-sm text-muted-foreground w-full flex-1 text-nowrap">
          {t("message", {
            count: futureEvents.length,
          })}
        </p>
        {/* View All Scheduled Dialog */}
        {futureEvents.length > 0 && (
          <ViewAllScheduledDialog events={futureEvents} locale={locale} />
        )}

        <Separator />
      </div>
    </>
  );
};

export default DashboardClient;

function ViewAllScheduledDialog({ events, locale }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("dashboard.all-scheduled-events");
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="p-0 m-0 cursor-pointer">
            {t("link")}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-background rounded-2xl !max-w-xl">
          <DialogHeader>
            <DialogTitle>{t("event-view-card.title")}</DialogTitle>
            <DialogDescription>
              {t("event-view-card.description")}
            </DialogDescription>
          </DialogHeader>
          {events.map((event) => (
            <EventViewCalendar key={event.id} event={event} locale={locale} />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
