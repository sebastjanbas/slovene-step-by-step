/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCheck, IconCalendar } from "@tabler/icons-react";

interface BookingSuccessProps {
  event: any;
  locale: string;
}

const BookingSuccess = ({ event, locale }: BookingSuccessProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <IconCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-green-600 dark:text-green-400">
          Booking Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            You have successfully booked your language club session.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <IconCalendar className="w-4 h-4" />
            <span>
              {new Date(event.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="font-medium">{event.theme}</p>
          <p className="text-sm text-muted-foreground">with {event.tutor}</p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>You will receive a confirmation email shortly.</p>
          <p>Location: {event.location}</p>
          <p>Duration: {event.duration} minutes</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSuccess;
