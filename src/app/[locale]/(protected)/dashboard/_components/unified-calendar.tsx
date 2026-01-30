"use client";
import React, {useMemo, useState, useRef, useCallback, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconCalendar,
  IconUsers,
  IconUser,
  IconTrash,
  IconCalendarSearch,
  IconLoader2,
  IconMapPin,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
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
import {useSidebar} from "@/components/ui/sidebar";

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

interface RegularSession {
  id: string;
  invitationId: number;
  tutorId: number;
  startTime: Date;
  duration: number;
  status: "booked";
  sessionType: string;
  location: string;
  studentId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
  description: string | null;
  isRecurring: true;
  dayOfWeek: number;
}

interface UnifiedCalendarProps {
  langClubEvents: LangClubEvent[];
  personalSessions: PersonalSession[];
  regularSessions: RegularSession[];
  locale: string;
}

const UnifiedCalendar = ({
  langClubEvents,
  personalSessions,
  regularSessions,
  locale,
}: UnifiedCalendarProps) => {
  const fullLocale = useLocale();
  const {state} = useSidebar();
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
  const [isCancelling, setIsCancelling] = useState<number | string | null>(null);
  const [rescheduleEvent, setRescheduleEvent] = useState<{
    id: number | string;
    type: "language-club" | "personal" | "regulars";
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

    // Add regular sessions
    regularSessions.forEach((session) => {
      const startTime = new Date(session.startTime);
      const endTime = new Date(startTime.getTime() + session.duration * 60000);
      events.push({
        id: session.id,
        title: session.sessionType,
        start: startTime,
        end: endTime,
        extendedProps: {
          type: "regulars",
          session: session,
          tutor: session.tutorName,
          location: session.location,
          duration: session.duration,
          tutorColor: session.tutorColor,
          isRecurring: true,
        },
        backgroundColor: session.tutorColor || "var(--sl-green)",
        borderColor: session.tutorColor || "var(--sl-green)",
        textColor: "#ffffff",
        classNames: ["regular-event"],
      });
    });

    return events;
  }, [langClubEvents, personalSessions, regularSessions]);

  // Combine all events for dialog display
  const allEvents = useMemo(() => {
    const events: Array<{
      id: number | string;
      type: "language-club" | "personal" | "regulars";
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
      isRecurring?: boolean;
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

    // Add regular sessions
    regularSessions.forEach((session) => {
      events.push({
        id: session.id,
        type: "regulars" as const,
        date: new Date(session.startTime),
        tutor: session.tutorName,
        theme: session.sessionType,
        location: session.location,
        duration: session.duration,
        tutorColor: session.tutorColor,
        description: session.description,
        isRecurring: true,
      });
    });

    return events;
  }, [langClubEvents, personalSessions, regularSessions]);

  const handleDateClick = (arg: { date: Date | string }) => {
    const clickedDate =
      typeof arg.date === "string" ? new Date(arg.date) : arg.date;
    setSelectedDate(clickedDate);
    setIsSheetOpen(true);
  };

  // Update calendar dimensions when sidebar state changes
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      // Add a small delay to allow sidebar transition to complete
      const timer = setTimeout(() => {
        calendarApi.updateSize();
      }, 300); // Match this with your sidebar transition duration
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleCancel = async (event: (typeof eventsOnSelectedDay)[0]) => {
    setIsCancelling(event.id);
    try {
      let response;
      if (event.type === "regulars") {
        toast.error("Regular sessions cannot be cancelled individually");
        setIsCancelling(null);
        return;
      } else if (event.type === "language-club" && event.bookingId) {
        response = await cancelBooking(event.bookingId);
      } else if (event.type === "personal" && typeof event.id === "number") {
        response = await cancelSession(event.id);
      } else {
        toast.error("Cannot cancel this event");
        setIsCancelling(null);
        return;
      }

      if (response?.status === 200) {
        router.refresh();
        toast.success(response.message || "Event cancelled successfully");
        setIsSheetOpen(false);
      } else {
        toast.error(response?.message || "Failed to cancel event");
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
    <div className="h-full rounded-2xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
      <Card className="h-full flex flex-col overflow-hidden p-1 py-4 min-h-[500px] bg-white dark:bg-[#1a1a1a] border border-border/40 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)]">
        <CardContent className="flex-1 min-h-0 overflow-hidden flex flex-col p-0">
          <div className="h-full flex flex-col">
            {/* Calendar Controls */}
            <div className="flex-shrink-0 px-6 pt-2 pb-3 flex items-center justify-between border-b border-border/30">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {calendarTitle}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Previous month"
                >
                  <IconChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="border-border/50 text-foreground bg-background hover:bg-muted/50 transition-all duration-200 font-medium"
                >
                  {tD("today-button") || "Today"}
                </Button>
                <button
                  onClick={goToNext}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Next month"
                >
                  <IconChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
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
            className="w-full sm:max-w-[440px] p-0 overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-[-4px_0_24px_rgba(0,0,0,0.15)]"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="relative px-8 pt-8 pb-6 border-b border-border/10">
                <SheetClose className="absolute right-6 top-6 rounded-full opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-muted p-2">
                  <IconX className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </SheetClose>

                <div className="pr-10">
                  <SheetTitle className="text-[28px] font-semibold text-foreground leading-tight tracking-tight">
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
                  <SheetDescription className="text-[14px] text-muted-foreground mt-3 leading-relaxed">
                    {eventsOnSelectedDay.length > 0
                      ? `${eventsOnSelectedDay.length} ${eventsOnSelectedDay.length === 1 ? "event" : "events"} scheduled`
                      : t("calendar-description") ||
                        "View your events for this day"}
                  </SheetDescription>
                </div>
              </SheetHeader>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50/30 dark:bg-[#1a1a1a]/30 smooth-scroll">
                {eventsOnSelectedDay.length === 0 ? (
                  <div className="flex flex-col items-center justify-center px-8 py-20">
                    <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mb-5">
                      <IconCalendar className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No events on this day
                    </h3>
                    <p className="text-sm text-muted-foreground text-center max-w-[280px] leading-relaxed">
                      {t("no-events", {
                        date: (selectedDate || new Date()).toLocaleDateString(
                          locale,
                          {
                            month: "long",
                            day: "numeric",
                          },
                        ),
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="px-6 py-6 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-[#252525] rounded-xl px-5 py-4 border border-border/10 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="text-[11px] font-medium text-muted-foreground/80 mb-2.5 uppercase tracking-[0.5px]">
                          Total Events
                        </div>
                        <div className="text-[36px] font-bold text-foreground leading-none">
                          {eventsOnSelectedDay.length}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-[#252525] rounded-xl px-5 py-4 border border-border/10 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="text-[11px] font-medium text-muted-foreground/80 mb-2.5 uppercase tracking-[0.5px]">
                          Language Club
                        </div>
                        <div className="text-[36px] font-bold text-foreground leading-none">
                          {
                            eventsOnSelectedDay.filter(
                              (e) => e.type === "language-club",
                            ).length
                          }
                        </div>
                      </div>
                    </div>

                    {/* Events List */}
                    <div className="space-y-4 pt-2">
                      <div className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-[0.5px] px-1">
                        Events
                      </div>
                      {eventsOnSelectedDay.map((event) => (
                        <div
                          key={`${event.type}-${event.id}`}
                          className="group relative bg-white dark:bg-[#252525] rounded-xl border border-border/10 dark:border-white/5 p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                              style={
                                event.type === "language-club"
                                  ? {background: "linear-gradient(to bottom right, var(--sl-purple), var(--sl-blue))"}
                                  : event.type === "regulars"
                                  ? {background: `linear-gradient(to bottom right, ${event.tutorColor || "var(--sl-green)"}, var(--sl-blue))`}
                                  : {background: "linear-gradient(to bottom right, var(--sl-blue), var(--sl-pink))"}
                              }
                            >
                              {event.type === "language-club" ? (
                                <IconUsers className="h-5 w-5 text-white" />
                              ) : (
                                <IconUser className="h-5 w-5 text-white" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0 space-y-3">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <h4 className="font-semibold text-[15px] text-foreground leading-tight">
                                    {event.theme}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={
                                      event.type === "language-club"
                                        ? "border-[var(--sl-purple)]/30 text-[var(--sl-purple)] bg-[var(--sl-purple)]/5 text-[11px] px-2 py-0.5 rounded-full font-medium"
                                        : event.type === "regulars"
                                        ? "border-[var(--sl-green)]/30 text-[var(--sl-green)] bg-[var(--sl-green)]/5 text-[11px] px-2 py-0.5 rounded-full font-medium"
                                        : "border-[var(--sl-pink)]/30 text-[var(--sl-pink)] bg-[var(--sl-pink)]/5 text-[11px] px-2 py-0.5 rounded-full font-medium"
                                    }
                                  >
                                    {event.type === "language-club"
                                      ? t("language-club") || "Language Club"
                                      : event.type === "regulars"
                                      ? t("regular-session") || "Regular Session"
                                      : t("personal-session") || "Personal Session"}
                                  </Badge>
                                </div>
                                <p className="text-[13px] text-muted-foreground/80">
                                  {t("event-tutor", { tutor: event.tutor })}
                                </p>
                              </div>

                              <div className="space-y-2 text-[13px]">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IconClock className="h-4 w-4 flex-shrink-0 opacity-60" />
                                  <span>
                                    {toZonedTime(
                                      event.date,
                                      "Europe/Ljubljana",
                                    ).toLocaleString(locale, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  <span className="mx-1 opacity-40">•</span>
                                  <span>
                                    {t("event-duration", {
                                      duration: event.duration,
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <IconMapPin className="h-4 w-4 flex-shrink-0 opacity-60" />
                                  <span className="truncate">
                                    {event.location}
                                  </span>
                                </div>
                                {event.type === "language-club" &&
                                  event.level && (
                                    <Badge
                                      variant="secondary"
                                      className="w-fit mt-1 text-[11px] px-2.5 py-0.5"
                                    >
                                      {event.level}
                                    </Badge>
                                  )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 flex-shrink-0">
                              {event.type === "regulars" ? (
                                <div className="text-[11px] text-muted-foreground/70 text-right max-w-[80px]">
                                  {t("recurring-note") || "Weekly recurring"}
                                </div>
                              ) : (
                                <>
                                  {event.type === "language-club" &&
                                    event.bookingId && (
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg border-border/50 hover:bg-muted/50 hover:border-border transition-all"
                                        disabled={isCancelling === event.id}
                                        onClick={() => handleReschedule(event)}
                                      >
                                        <IconCalendarSearch className="w-4 h-4" />
                                      </Button>
                                    )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300 transition-all"
                                        disabled={isCancelling === event.id}
                                      >
                                        {isCancelling === event.id ? (
                                          <IconLoader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                          <IconTrash className="w-4 h-4" />
                                        )}
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white dark:bg-[#1e1e1e] border-red-500 dark:border-red-500/30 border-2 rounded-2xl">
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
                                </>
                              )}
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
            if (!event || event.type !== "language-club" || typeof event.id !== "number") return null;

            // Create an event object matching RescheduleDialog's Event interface
            const currentEvent = {
              id: event.id as number,
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
