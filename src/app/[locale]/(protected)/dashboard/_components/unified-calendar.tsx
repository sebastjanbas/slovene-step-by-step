"use client";
import React, { useMemo, useState, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconCalendar,
  IconUsers,
  IconUser,
  IconTrash,
  IconCalendarSearch,
  IconLoader2,
  IconMapPin,
  IconClock, IconChevronLeft, IconChevronRight,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import { isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { cancelBooking } from "@/actions/stripe-actions";
import { cancelSession } from "@/actions/timeblocks";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import RescheduleDialog from "./reschedule-dialog";
import "@/components/calendar/calendar-styles.css";

interface LangClubEvent {
  id: number;
  description: string;
  date: Date;
  tutor: string;
  level: string;
  location: string;
  duration: number;
  theme: string;
  bookingId: number;
  bookingStatus: string;
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

interface UnifiedCalendarProps {
  langClubEvents: LangClubEvent[];
  personalSessions: PersonalSession[];
  locale: string;
}

const UnifiedCalendar = ({
  langClubEvents,
  personalSessions,
  locale,
}: UnifiedCalendarProps) => {
  const fullLocale = useLocale();
  const t = useTranslations("dashboard.events");
  const tD = useTranslations("dashboard.calendar");
  const tButtons = useTranslations("common.buttons");
  const tCancel = useTranslations("dashboard.cancel-booking-dialog");
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarTitle, setCalendarTitle] = useState("Calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);
  const [rescheduleEvent, setRescheduleEvent] = useState<{
    id: number;
    type: "language-club" | "personal";
    bookingId?: number;
  } | null>(null);

  // Transform events to FullCalendar format
  const calendarEvents = useMemo(() => {
    const events: Array<{
      id: string;
      title: string;
      start: Date;
      end: Date;
      extendedProps: Record<string, unknown>;
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      classNames?: string[];
    }> = [];

    // Add language club events
    langClubEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      events.push({
        id: `lang-club-${event.id}`,
        title: event.theme,
        start: eventDate,
        end: new Date(eventDate.getTime() + (event.duration || 45) * 60000),
        extendedProps: {
          type: "language-club",
          event: event,
          tutor: event.tutor,
          location: event.location,
          duration: event.duration,
          theme: event.theme,
        },
        backgroundColor: "var(--sl-purple)",
        borderColor: "var(--sl-blue)",
        textColor: "#ffffff",
        classNames: ["lang-club-event"],
      });
    });

    // Add personal sessions
    personalSessions.forEach((session) => {
      const startTime = new Date(session.startTime);
      const endTime = new Date(startTime.getTime() + session.duration * 60000);
      events.push({
        id: `personal-${session.id}`,
        title: session.sessionType,
        start: startTime,
        end: endTime,
        extendedProps: {
          type: "personal",
          session: session,
          tutor: session.tutorName,
          location: session.location,
          duration: session.duration,
          tutorColor: session.tutorColor,
        },
        backgroundColor: session.tutorColor || "var(--sl-pink)",
        borderColor: session.tutorColor || "var(--sl-pink)",
        textColor: "#ffffff",
        classNames: ["personal-event"],
      });
    });

    return events;
  }, [langClubEvents, personalSessions]);

  // Combine all events for dialog display
  const allEvents = useMemo(() => {
    const events: Array<{
      id: number;
      type: "language-club" | "personal";
      date: Date;
      tutor?: string;
      theme?: string;
      location?: string;
      duration?: number;
      tutorColor?: string;
      description?: string;
      level?: string;
      bookingId?: number;
      bookingStatus?: string;
    }> = [];

    // Add language club events
    langClubEvents.forEach((event) => {
      events.push({
        ...event,
        type: "language-club" as const,
        date: new Date(event.date),
      });
    });

    // Add personal sessions
    personalSessions.forEach((session) => {
      events.push({
        id: session.id,
        type: "personal" as const,
        date: new Date(session.startTime),
        tutor: session.tutorName,
        theme: session.sessionType,
        location: session.location,
        duration: session.duration,
        tutorColor: session.tutorColor,
      });
    });

    return events;
  }, [langClubEvents, personalSessions]);

  const handleDateClick = (arg: { date: Date | string }) => {
    const clickedDate =
      typeof arg.date === "string" ? new Date(arg.date) : arg.date;
    setSelectedDate(clickedDate);
    setIsSheetOpen(true);
  };

  const handleCancel = async (event: (typeof eventsOnSelectedDay)[0]) => {
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
        setIsSheetOpen(false);
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

  const handleReschedule = (event: (typeof eventsOnSelectedDay)[0]) => {
    if (event.type === "language-club" && event.bookingId) {
      // Close the rescheduling confirmation dialog first
      setRescheduleEvent({
        id: event.id,
        type: "language-club",
        bookingId: event.bookingId,
      });
    }
  };

  const eventsOnSelectedDay = useMemo(() => {
    if (!selectedDate) return [];
    return allEvents.filter((event) => {
      const eventDateInLjubljana = new Date(
        event.date.toLocaleDateString("en-CA", {
          timeZone: "Europe/Ljubljana",
        }),
      );
      const selectedDateInLjubljana = new Date(
        selectedDate.toLocaleDateString("en-CA", {
          timeZone: "Europe/Ljubljana",
        }),
      );
      return isSameDay(eventDateInLjubljana, selectedDateInLjubljana);
    });
  }, [selectedDate, allEvents]);

  const updateCalendarTitle = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const view = calendarApi.view;
      setCalendarTitle(view.title);
    }
  }, []);

  const goToToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
    updateCalendarTitle();
  };

  const goToPrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCalendarTitle();
  };

  const goToNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCalendarTitle();
  };

  React.useEffect(() => {
    updateCalendarTitle();
  }, [updateCalendarTitle]);

  return (
    <div className="h-full rounded-2xl p-[2px] bg-gradient-to-br from-[var(--sl-blue)]/30 via-[var(--sl-purple)]/30 to-[var(--sl-pink)]/30">
      <Card className="h-full flex flex-col overflow-hidden bg-card dark:bg-background">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[var(--sl-blue)] to-[var(--sl-purple)] bg-clip-text text-transparent font-bold">
              {t("calendar-title") || "Your Calendar"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 overflow-hidden flex flex-col p-0">
          <div className="h-full flex flex-col">
            {/* Calendar Controls */}
            <div className="flex-shrink-0 px-4 pt-2 pb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={goToPrev}
                  className="p-1.5 hover:bg-gradient-to-br hover:from-[var(--sl-blue)]/20 hover:to-[var(--sl-purple)]/20 rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <IconChevronLeft className="w-4 h-4 text-[var(--sl-purple)]" />
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="border-[var(--sl-purple)] text-[var(--sl-purple)] bg-[var(--sl-purple)]/5 hover:bg-[var(--sl-purple)]/10"
                >
                  {tD("today-button") || "Today"}
                </Button>
                <button
                  onClick={goToNext}
                  className="p-1.5 hover:bg-gradient-to-br hover:from-[var(--sl-purple)]/20 hover:to-[var(--sl-pink)]/20 rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <IconChevronRight className="w-4 h-4 text-[var(--sl-purple)]" />
                </button>
              </div>
              <h3 className="text-2xl font-semibold text-[var(--sl-purple)]">
                {calendarTitle}
              </h3>
            </div>

            {/* FullCalendar Component */}
            <div className="flex-1 min-h-0 overflow-hidden px-3 pb-2">
              <FullCalendar
                ref={calendarRef}
                locale={fullLocale}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                height="100%"
                events={calendarEvents}
                dateClick={handleDateClick}
                editable={false}
                selectable={false}
                dayMaxEvents={false}
                moreLinkClick="popover"
                weekNumbers={false}
                weekends={true}
                firstDay={1}
                eventContent={(eventInfo) => {
                  // Just show a simple dot indicator at the bottom of the day
                  return (
                    <div className="flex items-center justify-center w-full h-full min-h-[6px]">
                      <div
                        className="rounded-full flex-shrink-0 shadow-sm"
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: eventInfo.event.backgroundColor,
                          border: "none",
                        }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </CardContent>

        {/* Event Details Sheet */}
        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) {
              setRescheduleEvent(null);
            }
          }}
        >
          <SheetContent
            side="right"
            className="w-full lg:min-w-[600px] p-0 overflow-hidden bg-white dark:bg-background"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="px-6 pt-6 pb-5 border-b border-border/50 bg-white dark:bg-background">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-2xl font-bold text-foreground">
                    {t("event-on", {
                      date: (selectedDate || new Date()).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      ),
                    })}
                  </SheetTitle>
                </div>
                <SheetDescription className="text-sm text-muted-foreground pt-2">
                  {eventsOnSelectedDay.length > 0
                    ? `${eventsOnSelectedDay.length} ${eventsOnSelectedDay.length === 1 ? "event" : "events"} scheduled`
                    : t("calendar-description") ||
                      "View your events for this day"}
                </SheetDescription>
              </SheetHeader>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-background/50">
                {eventsOnSelectedDay.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-6">
                    <IconCalendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
                    <p className="text-center text-sm text-muted-foreground">
                      {t("no-events", {
                        date: (selectedDate || new Date()).toLocaleDateString(
                          locale,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        ),
                      })}
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
                          {eventsOnSelectedDay.length}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-background rounded-xl p-4 border border-border/30 shadow-sm">
                        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Language Club
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {
                            eventsOnSelectedDay.filter(
                              (e) => e.type === "language-club",
                            ).length
                          }
                        </div>
                      </div>
                    </div>

                    {/* Events List */}
                    <div className="space-y-4">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Events
                      </div>
                      {eventsOnSelectedDay.map((event) => (
                        <div
                          key={`${event.type}-${event.id}`}
                          className="bg-white dark:bg-background rounded-xl border border-border/30 p-5 shadow-md"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3 min-w-0">
                              <div className="flex items-start gap-3">
                                {event.type === "language-club" ? (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--sl-purple)] to-[var(--sl-blue)] flex items-center justify-center flex-shrink-0">
                                    <IconUsers className="h-5 w-5 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--sl-blue)] to-[var(--sl-pink)] flex items-center justify-center flex-shrink-0">
                                    <IconUser className="h-5 w-5 text-white" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-base text-foreground">
                                      {event.theme}
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className={
                                        event.type === "language-club"
                                          ? "border-[var(--sl-purple)] text-[var(--sl-purple)] bg-[var(--sl-purple)]/5"
                                          : "border-[var(--sl-pink)] text-[var(--sl-pink)] bg-[var(--sl-pink)]/5"
                                      }
                                    >
                                      {event.type === "language-club"
                                        ? t("language-club") || "Language Club"
                                        : t("personal-session") ||
                                          "Personal Session"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {t("event-tutor", { tutor: event.tutor })}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm pl-[52px]">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IconClock className="h-4 w-4 flex-shrink-0" />
                                  <span>
                                    {toZonedTime(
                                      event.date,
                                      "Europe/Ljubljana",
                                    ).toLocaleString(locale, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  <span className="mx-1">•</span>
                                  <span>
                                    {t("event-duration", {
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
                                {event.type === "language-club" &&
                                  event.level && (
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
                              {event.type === "language-club" &&
                                event.bookingId && (
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
                                <AlertDialogContent className="bg-white dark:bg-background border-red-500 dark:border-red-500/30 border-2">
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
                      ))}
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
            const event = eventsOnSelectedDay.find(
              (e) => e.id === rescheduleEvent.id && e.type === "language-club",
            );
            if (!event || event.type !== "language-club") return null;

            // Create event object matching RescheduleDialog's Event interface
            const currentEvent = {
              id: event.id,
              theme: event.theme || "",
              date: event.date,
              tutor: event.tutor || "",
              location: event.location || "",
              duration: event.duration || 45,
              maxBooked: 10, // Default value, will be fetched by RescheduleDialog
              peopleBooked: 0, // Default value, will be fetched by RescheduleDialog
              level: event.level || "",
              price: 0, // Default value
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
      </Card>
    </div>
  );
};

export default UnifiedCalendar;
