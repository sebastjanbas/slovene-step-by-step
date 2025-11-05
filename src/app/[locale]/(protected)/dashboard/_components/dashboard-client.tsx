"use client";
import React, { useMemo, useState } from "react";
import NextEventCard from "./next-event-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconUsers,
  IconUser,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconTrash,
  IconCalendarSearch,
  IconLoader2,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toZonedTime } from "date-fns-tz";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { cancelBooking } from "@/actions/stripe-actions";
import { cancelSession } from "@/actions/timeblocks";
import RescheduleDialog from "./reschedule-dialog";

interface LangClubEvent {
  id: number;
  description: string;
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  theme: string;
  bookingId: number;
  bookingStatus: string;
  level?: string;
}

interface PersonalSession {
  id: number;
  tutorId: number;
  startTime: Date;
  duration: number;
  status: string;
  sessionType: string;
  location: string;
  studentId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
}

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

interface DashboardClientProps {
  langClubEvents: LangClubEvent[];
  personalSessions: PersonalSession[];
  locale: string;
}

const DashboardClient = ({
  langClubEvents,
  personalSessions,
  locale,
}: DashboardClientProps) => {
  const t = useTranslations("dashboard.all-scheduled-events");

  // Combine and sort all events by date
  const allEvents: UnifiedEvent[] = useMemo(() => {
    const now = new Date();
    const events: UnifiedEvent[] = [];

    // Add language club events
    langClubEvents.forEach((event) => {
      if (new Date(event.date) > now) {
        events.push({
          id: event.id,
          type: "language-club",
          date: new Date(event.date),
          tutor: event.tutor,
          location: event.location,
          duration: event.duration,
          theme: event.theme,
          bookingId: event.bookingId,
          bookingStatus: event.bookingStatus,
          level: event.level,
        });
      }
    });

    // Add personal sessions
    personalSessions.forEach((session) => {
      if (new Date(session.startTime) > now && session.status === "booked") {
        events.push({
          id: session.id,
          type: "personal",
          date: new Date(session.startTime),
          tutor: session.tutorName,
          location: session.location,
          duration: session.duration,
          theme: session.sessionType,
          tutorColor: session.tutorColor,
          sessionType: session.sessionType,
        });
      }
    });

    // Sort by date (earliest first)
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [langClubEvents, personalSessions]);

  const nextEvent = allEvents.length > 0 ? allEvents[0] : null;

  return (
    <>
      {nextEvent ? (
        <div className="flex flex-col gap-4">
          <NextEventCard event={nextEvent} locale={locale} />
        </div>
      ) : (
        <p>{t("no-future-events")}</p>
      )}
      <div className="inline-flex gap-2 w-full items-center overflow-hidden">
        <p className="text-sm text-muted-foreground w-full flex-1 text-nowrap">
          {t("message", {
            count: allEvents.length,
          })}
        </p>
        {/* View All Scheduled Dialog */}
        {allEvents.length > 0 && (
          <ViewAllScheduledDialog events={allEvents} locale={locale} />
        )}

        <Separator />
      </div>
    </>
  );
};

export default DashboardClient;

function ViewAllScheduledDialog({
  events,
  locale,
}: {
  events: UnifiedEvent[];
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);
  const [rescheduleEvent, setRescheduleEvent] = useState<{
    id: number;
    type: "language-club" | "personal";
    bookingId?: number;
  } | null>(null);
  const t = useTranslations("dashboard.all-scheduled-events");
  const tE = useTranslations("dashboard.events");
  const tButtons = useTranslations("common.buttons");
  const tCancel = useTranslations("dashboard.cancel-booking-dialog");
  const router = useRouter();

  // Sort events by date
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  const langClubCount = events.filter((e) => e.type === "language-club").length;

  const handleCancel = async (event: UnifiedEvent) => {
    setIsCancelling(event.id);
    try {
      let response;
      if (event.type === "language-club" && event.bookingId) {
        response = await cancelBooking(event.bookingId);
      } else if (event.type === "personal") {
        response = await cancelSession(event.id);
      } else {
        toast.error("Cannot cancel this event");
        setIsCancelling(null);
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
      setIsCancelling(null);
    }
  };

  const handleReschedule = (event: UnifiedEvent) => {
    if (event.type === "language-club" && event.bookingId) {
      setRescheduleEvent({
        id: event.id,
        type: "language-club",
        bookingId: event.bookingId,
      });
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="link" className="p-0 m-0 cursor-pointer">
            {t("link")}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full lg:min-w-[600px] p-0 overflow-hidden bg-white dark:bg-background"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-6 pt-6 pb-5 border-b border-border/50 bg-white dark:bg-background">
              <SheetTitle className="text-2xl font-bold text-foreground">
                {t("event-view-card.title") || "All Scheduled Events"}
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground pt-2">
                {t("event-view-card.description") ||
                  `View all your upcoming events`}
              </SheetDescription>
            </SheetHeader>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-background/50">
              {sortedEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <IconCalendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-center text-sm text-muted-foreground">
                    {t("no-future-events")}
                  </p>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-background rounded-xl p-4 border border-border/30 shadow-sm">
                      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Total Events
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        {sortedEvents.length}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-background rounded-xl p-4 border border-border/30 shadow-sm">
                      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Language Club
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        {langClubCount}
                      </div>
                    </div>
                  </div>

                  {/* Events List */}
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Events
                    </div>
                    {sortedEvents.map((event) => {
                      const isLanguageClub = event.type === "language-club";
                      const iconContainerStyle = isLanguageClub
                        ? {background: "linear-gradient(to bottom right, var(--sl-purple), var(--sl-blue))",}
                        : {background: "linear-gradient(to bottom right, var(--sl-blue), var(--sl-pink))",};

                      return (
                        <div
                          key={`${event.type}-${event.id}`}
                          className="bg-white dark:bg-background rounded-xl border border-border/30 p-5 shadow-md"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3 min-w-0">
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={iconContainerStyle}
                                >
                                  {isLanguageClub ? (
                                    <IconUsers className="h-5 w-5 text-white" />
                                  ) : (
                                    <IconUser className="h-5 w-5 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-base text-foreground">
                                      {event.theme}
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className={
                                        isLanguageClub
                                          ? "border-[var(--sl-purple)] text-[var(--sl-purple)] bg-[var(--sl-purple)]/5"
                                          : "border-[var(--sl-pink)] text-[var(--sl-pink)] bg-[var(--sl-pink)]/5"
                                      }
                                    >
                                      {isLanguageClub
                                        ? tE("language-club") || "Language Club"
                                        : tE("personal-session") ||
                                          "Personal Session"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {tE("event-tutor", { tutor: event.tutor })}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm pl-[52px]">
                                <div className="flex items-center gap-2 text-muted-foreground">
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
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IconClock className="h-4 w-4 flex-shrink-0" />
                                  <span>
                                    {tE("event-duration", {
                                      duration: event.duration,
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IconMapPin className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {event.location}
                                  </span>
                                </div>
                                {isLanguageClub && event.level && (
                                  <Badge
                                    variant="secondary"
                                    className="w-fit mt-2"
                                  >
                                    {event.level}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 flex-shrink-0">
                              {isLanguageClub && event.bookingId && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="cursor-pointer"
                                  disabled={isCancelling === event.id}
                                  onClick={() => handleReschedule(event)}
                                >
                                  <IconCalendarSearch className="w-4 h-4" />
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer"
                                    disabled={isCancelling === event.id}
                                  >
                                    {isCancelling === event.id ? (
                                      <IconLoader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <IconTrash className="w-4 h-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white dark:bg-background border-red-500 dark:border-red-500/30 border-2 rounded-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      {tCancel("title")}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {tCancel("description")}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      {tButtons("cancel")}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        toast.promise(handleCancel(event), {
                                          loading: tButtons("cancelling"),
                                        })
                                      }
                                      disabled={isCancelling === event.id}
                                      className={buttonVariants({
                                        variant: "destructive",
                                      })}
                                    >
                                      {isCancelling === event.id ? (
                                        <>
                                          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                          {tButtons("cancelling")}
                                        </>
                                      ) : (
                                        tButtons("cancel-booking")
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Reschedule Dialog */}
      {rescheduleEvent &&
        rescheduleEvent.type === "language-club" &&
        rescheduleEvent.bookingId &&
        (() => {
          const event = sortedEvents.find(
            (e) => e.id === rescheduleEvent.id && e.type === "language-club",
          );
          if (!event || event.type !== "language-club") return null;

          const currentEvent = {
            id: event.id,
            theme: event.theme || "",
            date: event.date,
            tutor: event.tutor || "",
            location: event.location || "",
            duration: event.duration || 45,
            maxBooked: 10,
            peopleBooked: 0,
            level: event.level || "",
            price: 0,
          };

          return (
            <RescheduleDialog
              open={!!rescheduleEvent}
              onOpenChange={(open) => {
                if (!open) {
                  setRescheduleEvent(null);
                }
              }}
              currentEvent={currentEvent}
              bookingId={rescheduleEvent.bookingId}
              locale={locale}
            />
          );
        })()}
    </>
  );
}
