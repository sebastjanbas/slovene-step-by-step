"use client";
import React from "react";
import NextEventCard from "./next-event-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
  return (
    <>
      {futureEvents.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          <NextEventCard event={futureEvents[0]} locale={locale} />
        </div>
      ) : (
        <p>No future events</p>
      )}
      <div className="inline-flex gap-2 w-full items-center">
        <p className="text-sm text-muted-foreground w-full flex-1 text-nowrap">
          You have {futureEvents.length}{" "}
          {futureEvents.length === 1 ? "event" : "events"} coming up.{" "}
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
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="link"
        className="p-0 m-0 cursor-pointer"
      >
        View all
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-2 right-2 z-10">
              <Button
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="Close"
                variant="ghost"
                size="icon"
              >
                ×
              </Button>
            </div>
            <div className="p-0">
              <div className="rounded-lg shadow-lg bg-background p-6">
                <h2 className="text-lg font-semibold mb-4">
                  All Scheduled Events
                </h2>
                <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                  {events.map((event) => (
                    <div key={event.id}>
                      <div className="border rounded-lg bg-muted/30">
                        <div className="p-3 flex flex-col gap-1">
                          <div className="font-medium">{event.theme}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleString(locale, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Tutor: {event.tutor} | Location: {event.location} |
                            Duration: {event.duration} min
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Status: {event.bookingStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="px-4 py-2 cursor-pointer"
                    variant="secondary"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
