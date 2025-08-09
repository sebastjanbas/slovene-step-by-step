"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCalendar, IconExternalLink } from "@tabler/icons-react";
import { toZonedTime } from "date-fns-tz";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const NextEventCard = ({ event, locale }) => {
  const t = useTranslations("dashboard.events");

  const handleCancel = () => {
    alert("cancel reservation");
  };

  const handleReschedule = () => {
    alert("reschedule reservation");
  };

  return (
    <Card className="w-full max-w-md mx-auto min-w-sm">
      <CardHeader className="text-center text-2xl font-medium tracking-tight">
        <CardTitle>{t("next-event")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <IconCalendar className="w-4 h-4" />
            <span>
              {toZonedTime(event.date, "Europe/Ljubljana").toLocaleDateString(
                locale,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </div>
          <p className="font-medium">{event.theme}</p>
          <p className="text-sm text-muted-foreground">
            {t("event-tutor", { tutor: event.tutor })}
          </p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("event-location")}
            <span className="inline-flex items-center gap-1">
              {event.location} <IconExternalLink className="w-4 h-4" />
            </span>
          </a>
          <p>{t("event-duration", { duration: event.duration })}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-5 items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              {useTranslations("common.buttons")("cancel-booking")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-background border-red-500 dark:border-red-500/30 border-2">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your booking? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {useTranslations("common.buttons")("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancel}
                className={buttonVariants({ variant: "destructive" })}
              >
                {useTranslations("common.buttons")("cancel-booking")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={handleReschedule} variant="outline" className="flex-1">
          {useTranslations("common.buttons")("reschedule")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NextEventCard;
