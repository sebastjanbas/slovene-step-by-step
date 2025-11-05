"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCalendar,
  IconLoader2,
  IconUsers,
  IconUser,
  IconClock,
  IconMapPin,
} from "@tabler/icons-react";
import { toZonedTime } from "date-fns-tz";
import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import RescheduleDialog from "./reschedule-dialog";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { cancelBooking } from "@/actions/stripe-actions";
import { cancelSession } from "@/actions/timeblocks";

interface UnifiedEvent {
  id: number;
  type: "language-club" | "personal";
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  theme: string;
  bookingId?: number;
  bookingStatus?: string;
  level?: string;
  tutorColor?: string;
  sessionType?: string;
}

interface NextEventCardProps {
  event: UnifiedEvent;
  locale: string;
}

const NextEventCard = ({ event, locale }: NextEventCardProps) => {
  const t = useTranslations("dashboard.events");
  const d = useTranslations("dashboard.cancel-booking-dialog");
  const tC = useTranslations("common.buttons");
  const [isCancelling, setIsCancelling] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  // Update the current time every second for a smooth countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for a smooth countdown

    return () => clearInterval(interval);
  }, []);

  const handleCancel = async () => {
    setIsCancelling(true);

    try {
      let response;
      if (event.type === "language-club" && event.bookingId) {
        response = await cancelBooking(event.bookingId);
      } else if (event.type === "personal") {
        response = await cancelSession(event.id);
      } else {
        toast.error("Cannot cancel this event");
        setIsCancelling(false);
        return;
      }

      if (response?.success) {
        router.refresh();
        toast.success(response.message || "Event cancelled successfully");
      } else {
        toast.error(response?.error || "Failed to cancel event");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel event");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReschedule = () => {
    setShowRescheduleDialog(true);
  };

  const isLanguageClub = event.type === "language-club";
  const gradientColor = isLanguageClub
    ? "from-[var(--sl-purple)] to-[var(--sl-blue)]"
    : event.tutorColor
      ? `from-[${event.tutorColor}] to-[${event.tutorColor}]`
      : "from-[var(--sl-pink)] to-[var(--sl-purple)]";

  // Calculate time remaining with seconds always displayed
  const timeLeft = useMemo(() => {
    const now = currentTime;
    const eventTime = new Date(event.date);
    const diffMs = eventTime.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "Event started";
    }

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const seconds = diffSeconds % 60;
    const minutes = diffMinutes % 60;
    const hours = diffHours % 24;

    if (diffDays > 0) {
      return hours > 0
        ? `${diffDays}d ${hours}h ${minutes}m`
        : `${diffDays}d ${minutes}m`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${minutes}m`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ${seconds}s`;
    } else {
      return `${diffSeconds}s`;
    }
  }, [event.date, currentTime]);

  return (
    <>
      <div className="w-full rounded-2xl p-[2px] bg-gradient-to-br from-[var(--sl-blue)]/30 via-[var(--sl-purple)]/30 to-[var(--sl-pink)]/30">
        <Card className="w-full bg-card dark:bg-background rounded-2xl border-0 shadow-sm">
          <CardHeader>
            <div className="relative">
              <p
                key={timeLeft}
                className="text-sm font-semibold text-foreground/50 tabular-nums transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-2"
              >
                {timeLeft}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <CardTitle className="text-lg tracking-tight font-semibold">
                {t("next-event")}
              </CardTitle>
              <div
                className={`bg-gradient-to-br ${gradientColor} p-2 rounded-lg`}
              >
                {isLanguageClub ? (
                  <IconUsers className="h-5 w-5" />
                ) : (
                  <IconUser className="h-5 w-5" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Event Type Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={
                  isLanguageClub
                    ? "border-[var(--sl-purple)] text-[var(--sl-purple)] bg-[var(--sl-purple)]/5"
                    : "border-[var(--sl-pink)] text-[var(--sl-pink)] bg-[var(--sl-pink)]/5"
                }
              >
                {isLanguageClub
                  ? t("language-club") || "Language Club"
                  : t("personal-session") || "Personal Session"}
              </Badge>
              {event.level && (
                <Badge variant="secondary" className="text-xs">
                  {event.level}
                </Badge>
              )}
            </div>

            {/* Event Title */}
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {event.theme}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("event-tutor", { tutor: event.tutor })}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconCalendar className="h-4 w-4 flex-shrink-0" />
                <span>
                  {toZonedTime(
                    event.date,
                    "Europe/Ljubljana",
                  ).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconClock className="h-4 w-4 flex-shrink-0" />
                <span>{t("event-duration", { duration: event.duration })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconMapPin className="h-4 w-4 flex-shrink-0" />
                {/*<a*/}
                {/*  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}*/}
                {/*  target="_blank"*/}
                {/*  rel="noopener noreferrer"*/}
                {/*  className="inline-flex items-center gap-1 hover:underline"*/}
                {/*>*/}
                <span className="truncate">{event.location}</span>
                {/*  <IconExternalLink className="w-3.5 h-3.5" />*/}
                {/*</a>*/}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row gap-3 pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/50 text-red-500 hover:text-red-700 hover:bg-red-50 dark:border-destructive/50 dark:text-foreground dark:hover:bg-red-400/10"
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      {tC("cancelling")}
                    </>
                  ) : (
                    tC("cancel-booking")
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-background border-red-500 dark:border-red-500/30 border-2 rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>{d("title")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {d("description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tC("cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      toast.promise(handleCancel, {
                        loading: tC("cancelling"),
                      })
                    }
                    disabled={isCancelling}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    {isCancelling ? (
                      <>
                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        {tC("cancelling")}
                      </>
                    ) : (
                      tC("cancel-booking")
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {isLanguageClub && event.bookingId && (
              <Button
                onClick={handleReschedule}
                variant="outline"
                className="flex-1 border-[var(--sl-purple)] text-[var(--sl-purple)] bg-[var(--sl-purple)]/5 hover:bg-[var(--sl-purple)]/10"
              >
                {tC("reschedule")}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {isLanguageClub && event.bookingId && (
        <RescheduleDialog
          open={showRescheduleDialog}
          onOpenChange={setShowRescheduleDialog}
          currentEvent={{
            id: event.id,
            theme: event.theme,
            date: event.date,
            tutor: event.tutor,
            location: event.location,
            duration: event.duration,
            maxBooked: 10, // Will be fetched by RescheduleDialog
            peopleBooked: 0, // Will be fetched by RescheduleDialog
            level: event.level || "",
            price: 0, // Will be fetched by RescheduleDialog
          }}
          bookingId={event.bookingId}
          locale={locale}
        />
      )}
    </>
  );
};

export default NextEventCard;
