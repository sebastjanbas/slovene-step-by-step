"use client";
import React from "react";
import NextEventCard from "./next-event-card";

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
  return (
    <>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="flex flex-col gap-4 mt-4">
            <NextEventCard event={event} locale={locale} />
          </div>
        ))
      ) : (
        <p>No future events</p>
      )}
    </>
  );
};

export default DashboardClient;
