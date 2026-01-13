/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { TutoringSession, EventClickArg } from "@/components/calendar/types";
import { CalendarControls } from "@/components/calendar/calendar-controls";
import { EventSheet } from "@/components/calendar/event-sheet";
import { NoSlotsOverlay } from "@/components/calendar/no-slots-overlay";
import "@/components/calendar/calendar-styles.css";
import {useLocale, useTranslations} from "next-intl";
import {useSidebar} from "@/components/ui/sidebar";

// Transform database tutors to the format expected by the calendar
const transformTutors = (tutorsData: any[]) => {
  return tutorsData.map((tutor) => ({
    id: tutor.id,
    name: tutor.name,
    avatar: tutor.avatar,
    color: tutor.color,
    email: tutor.email,
    phone: tutor.phone,
    bio: tutor.bio,
    specializations: [], // Add this field if you have it in your database
  }));
};

// Generate available time slots from tutor schedules
const generateAvailableSlots = (
  schedulesData: any[],
  tutorsData: any[],
  timeblocksData: any[],
) => {
  const availableSlots: TutoringSession[] = [];
  const now = new Date();
  const fourWeeksFromNow = new Date(
    now.getTime() + 4 * 7 * 24 * 60 * 60 * 1000,
  );

  // Get all booked timeblocks for the next 4 weeks
  const bookedTimeblocks = timeblocksData.filter((timeblock) => {
    const startTime = new Date(timeblock.startTime);
    return startTime >= now && startTime <= fourWeeksFromNow && timeblock.status === "booked";
  });

  schedulesData.forEach((schedule) => {
    const tutor = tutorsData.find((t) => t.clerkId === schedule.ownerId);
    if (!tutor) return;

    try {
      const scheduleData =
        typeof schedule.schedule === "string"
          ? JSON.parse(schedule.schedule)
          : schedule.schedule;

      // Get the day of the week for the current date (0 = Sunday, 1 = Monday, etc.)
      let dayOfTheWeek = new Date(now).getDay();

      // Generate slots for each day of the week for the next 4 weeks
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          const currentDate = new Date(now);
          currentDate.setDate(currentDate.getDate() + week * 7 + day);

          // Skip past dates
          if (currentDate < now) continue;

          // Find the schedule for this day (0 = Sunday, 1 = Monday, etc.)
          const daySchedule = scheduleData.find(
            (scheduleDay: any) => scheduleDay.day === dayOfTheWeek % 7,
          );
          dayOfTheWeek++; // Move to the next day of the week

          if (
            daySchedule &&
            daySchedule.timeSlots &&
            daySchedule.timeSlots.length > 0
          ) {
            daySchedule.timeSlots.forEach((timeSlot: any) => {
              const [startHour, startMinute] = timeSlot.startTime
                .split(":")
                .map(Number);

              // Calculate end time using duration (in minutes)
              const slotStart = new Date(currentDate);
              slotStart.setHours(startHour, startMinute, 0, 0);

              const slotEnd = new Date(
                slotStart.getTime() + timeSlot.duration * 60000,
              );

              // Skip if this slot is in the past
              if (slotStart < now) return;

              // Check if this time slot is already booked
              const isBooked = bookedTimeblocks.some((booked) => {
                const bookedStart = new Date(booked.startTime);
                const bookedEnd = new Date(
                  bookedStart.getTime() + booked.duration * 60000,
                );

                return (
                  booked.tutorId === tutor.id &&
                  ((slotStart >= bookedStart && slotStart < bookedEnd) ||
                    (slotEnd > bookedStart && slotEnd <= bookedEnd) ||
                    (slotStart <= bookedStart && slotEnd >= bookedEnd))
                );
              });

              if (!isBooked) {
                const duration =
                  (slotEnd.getTime() - slotStart.getTime()) / 60000; // in minutes

                availableSlots.push({
                  id: `available-${tutor.id}-${slotStart.getTime()}`,
                  tutorId: tutor.id,
                  tutorName: tutor.name,
                  startTime: slotStart,
                  endTime: slotEnd,
                  duration: duration,
                  status: "available",
                  sessionType: timeSlot.sessionType,
                  location: timeSlot.location ?? "Online", // Default location
                  description: "Available for booking",
                });
              }
            });
          }
        }
      }
    } catch {
      // Handle schedule parsing errors silently
    }
  });

  return availableSlots;
};

// Transform database timeblocks to TutoringSession format (for booked sessions)
const transformTimeblocksToSessions = (
  timeblocksData: any[],
  tutorsData: any[],
) => {
  return timeblocksData.map((timeblock) => {
    const tutor = tutorsData.find((t) => t.id === timeblock.tutorId);
    const startTime = new Date(timeblock.startTime);
    const endTime = new Date(startTime.getTime() + timeblock.duration * 60000); // duration in minutes

    return {
      id: timeblock.id.toString(),
      tutorId: timeblock.tutorId.toString(),
      tutorName: tutor?.name || "Unknown Tutor",
      startTime: startTime,
      endTime: endTime,
      duration: timeblock.duration,
      sessionType: timeblock.sessionType,
      location: timeblock.location,
      status: timeblock.status,
      description: timeblock.description,
      studentId: timeblock.studentId,
    };
  });
};

interface CalendarProps {
  scheduleData: any;
  timeblocksData: any;
  tutorsData: any;
  studentId: string;
}

// Map FullCalendar view names to URL-friendly names
const viewNameToUrl = (viewName: string): string => {
  const mapping: Record<string, string> = {
    dayGridMonth: "month",
    timeGridWeek: "week",
    timeGridDay: "day",
    timeGrid2Day: "2days",
    timeGrid3Day: "3days",
    listWeek: "list",
  };
  return mapping[viewName] || "month";
};

// Map URL-friendly names back to FullCalendar view names
const urlToViewName = (urlView: string | null): string => {
  const mapping: Record<string, string> = {
    month: "dayGridMonth",
    week: "timeGridWeek",
    day: "timeGridDay",
    "2days": "timeGrid2Day",
    "3days": "timeGrid3Day",
    list: "listWeek",
  };
  return mapping[urlView || ""] || "dayGridMonth";
};

export default function Calendar({
  scheduleData,
  timeblocksData,
  tutorsData,
  studentId,
}: CalendarProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("calendar.event-type")
  const {state} = useSidebar();

  // Transform the data from a database
  const transformedTutors = transformTutors(tutorsData);

  // Generate available slots from schedules
  const availableSlots = generateAvailableSlots(
    scheduleData,
    tutorsData,
    timeblocksData,
  );

  // Get booked sessions (only future ones)
  const bookedSessions = transformTimeblocksToSessions(
    timeblocksData,
    tutorsData,
  // ).filter((session) => (session.startTime >= new Date() && session.status === "booked" ));
).filter((session) => (session.startTime >= new Date()));

  const [selectedEvent, setSelectedEvent] = useState<TutoringSession | null>(
    null,
  );
  const [isEventSheetOpen, setIsEventSheetOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [calendarTitle, setCalendarTitle] = useState("Calendar");

  // Initialize view from URL or default to month
  const urlView = searchParams.get("view");
  const initialView = urlToViewName(urlView);
  const [currentView, setCurrentView] = useState(initialView);

  const [showWeekends, setShowWeekends] = useState(true);
  const [selectedTutorId, setSelectedTutorId] = useState<number | null>(null);
  const [showBookedSessions, setShowBookedSessions] = useState(false);

  // Filter events based on the selected tutor or booked events
  const events = useMemo(() => {
    // Get booked events for the student
    if (showBookedSessions) {
      return bookedSessions.filter((event) => event.studentId === studentId);
    }
    if (selectedTutorId === null) {
      return availableSlots;
    } else {
      return availableSlots.filter(
        (event: TutoringSession) => event.tutorId === selectedTutorId,
      );
    }
  }, [
    selectedTutorId,
    availableSlots,
    showBookedSessions,
    bookedSessions,
    studentId,
  ]);

  // Determine if we should show the no slots overlay and what message to display
  const noSlotsOverlay = useMemo(() => {
    // Don't show overlay when viewing booked sessions
    if (showBookedSessions) {
      return null;
    }

    // Check if a specific tutor is selected and has no available slots
    if (selectedTutorId !== null && events.length === 0) {
      const tutor = transformedTutors.find((t) => t.id === selectedTutorId);
      return {
        type: "tutor",
        tutor: tutor?.name
      };
    }

    // Check if no tutors have any available slots
    if (selectedTutorId === null && availableSlots.length === 0) {
      return {
        type: "all",
        tutor: null
      };
    }

    return null;
  }, [
    showBookedSessions,
    selectedTutorId,
    events.length,
    availableSlots.length,
    transformedTutors,
  ]);
  const calendarRef = useRef<FullCalendar>(null);
  const isUpdatingViewRef = useRef(false);

  // Update URL parameters when view or other state changes
  const updateURLParams = useCallback(
    (updates: { view?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.view !== undefined) {
        const urlViewName = viewNameToUrl(updates.view);
        params.set("view", urlViewName);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Initialize the calendar from URL on mount and sync with URL changes
  useEffect(() => {
    // Don't update if we're in the middle of a programmatic view change
    if (isUpdatingViewRef.current) return;

    const urlView = searchParams.get("view");
    const viewName = urlToViewName(urlView);

    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    // Only update if different from the current view
    if (viewName !== currentView) {
      // Small delay to ensure the calendar is fully mounted
      const timer = setTimeout(() => {
        calendarApi.changeView(viewName);
        setCurrentView(viewName);
        updateCalendarTitle();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Even if the view matches, update title
      const timer = setTimeout(() => {
        updateCalendarTitle();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams, currentView]); // React to URL changes (including initial mount)

  const handleTutorSelect = (tutorId: number | null) => {
    setSelectedTutorId(tutorId);
  };

  const changeView = useCallback(
    (viewName: string) => {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        isUpdatingViewRef.current = true;
        calendarApi.changeView(viewName);
        setCurrentView(viewName);
        updateCalendarTitle();
        // Update URL parameter
        updateURLParams({ view: viewName });
        // Reset flag after a brief delay
        setTimeout(() => {
          isUpdatingViewRef.current = false;
        }, 200);
      }
    },
    [updateURLParams],
  );

  const handleMoreEventsClick = useCallback(
    (date: Date) => {

      // Find the start of the week (Monday) for the clicked date
      // FullCalendar typically uses Monday as the start of the week
      const startOfWeek = new Date(date);
      const dayOfWeek = startOfWeek.getDay(); // 0 = Sunday, 1 = Monday, etc.

      // Adjust to Monday start (if Sunday, go back 6 days; otherwise go back to Monday)
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(startOfWeek.getDate() - daysToSubtract);

      // Set the calendar-to-week view and navigate to that week
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        // Navigate to the specific date first
        calendarApi.gotoDate(startOfWeek);
        // Use the existing changeView function to properly update the state
        changeView("timeGridWeek");
      }
    },
    [changeView],
  );

  // Handle more events clicks
  useEffect(() => {
    const handleMoreEventsClickEvent = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("fc-more-link")) {
        event.preventDefault();
        event.stopPropagation();

        // Get the date from the more link
        const dayEl = target.closest(".fc-daygrid-day");
        if (dayEl) {
          const dateStr = dayEl.getAttribute("data-date");
          if (dateStr) {
            // Parse the date string and create a proper Date object
            const date = new Date(dateStr + "T00:00:00");
            handleMoreEventsClick(date);
          }
        }
      }
    };

    // Add an event listener to the calendar container
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const calendarEl = (calendarApi as any).el;
      if (calendarEl) {
        calendarEl.addEventListener("click", handleMoreEventsClickEvent);
        return () => {
          calendarEl.removeEventListener("click", handleMoreEventsClickEvent);
        };
      }
    }
  }, [handleMoreEventsClick]);

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


  const handleEventClick = (arg: EventClickArg) => {
    // Convert FullCalendar event back to TutoringSession
    const session: TutoringSession = {
      id: arg.event.id,
      tutorId: arg.event.extendedProps.tutorId,
      tutorName: arg.event.extendedProps.tutor,
      startTime: new Date(arg.event.start!),
      endTime: new Date(arg.event.end!),
      duration: arg.event.extendedProps.duration,
      sessionType: arg.event.extendedProps.sessionType,
      location: arg.event.extendedProps.location,
      status: arg.event.extendedProps.status,
      description: arg.event.extendedProps.description,
    };
    setSelectedEvent(session);
    setIsEventSheetOpen(true);
  };

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

  const updateCalendarTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const view = calendarApi.view;
      setCalendarTitle(view.title);
    }
  };

  return (
    <div className="h-full flex flex-col p-5">
      <div className="flex-shrink-0">
        <CalendarControls
          calendarTitle={calendarTitle}
          setShowWeekends={setShowWeekends}
          goToPrev={goToPrev}
          goToNext={goToNext}
          goToToday={goToToday}
          isViewDropdownOpen={isViewDropdownOpen}
          setIsViewDropdownOpen={setIsViewDropdownOpen}
          currentView={currentView}
          changeView={changeView}
          showWeekends={showWeekends}
          tutors={transformedTutors}
          selectedTutorId={selectedTutorId}
          onTutorSelect={handleTutorSelect}
          showBookedSessions={showBookedSessions}
          setBookedSessions={setShowBookedSessions}
        />
      </div>

      {/* FullCalendar Component */}
      <div className="flex-1 min-h-0 h-screen relative">
        {noSlotsOverlay && (
          <NoSlotsOverlay
            type={noSlotsOverlay.type}
            tutor={noSlotsOverlay.tutor}
          />
        )}
        <FullCalendar
          locale={locale}
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView={initialView}
          headerToolbar={false}
          height="100%"
          views={{
            timeGridWeek: {
              type: "timeGrid",
              duration: { weeks: 1 },
              buttonText: "Week",
              allDaySlot: false,
              dayHeaderFormat: { weekday: "short" },
            },
            timeGrid2Day: {
              type: "timeGrid",
              duration: { days: 2 },
              buttonText: "2 days",
              allDaySlot: false,
              dayHeaderFormat: { weekday: "long", day: "numeric" },
            },
            timeGrid3Day: {
              type: "timeGrid",
              duration: { days: 3 },
              buttonText: "3 days",
              allDaySlot: false,
              dayHeaderFormat: { weekday: "long", day: "numeric" },
            },
            timeGridDay: {
              type: "timeGrid",
              duration: { days: 1 },
              buttonText: "Day",
              allDaySlot: false,
              dayHeaderFormat: { weekday: "long", day: "numeric" },
            },
          }}
          allDaySlot={false}
          events={events.map((session) => ({
            id: session.id,
            title: session.sessionType,
            start: session.startTime,
            end: session.endTime,
            extendedProps: {
              tutorId: session.tutorId,
              tutor: session.tutorName,
              duration: session.duration,
              sessionType: session.sessionType,
              location: session.location,
              status: session.status,
              description: session.description,
            },
          }))}
          eventClick={handleEventClick}
          editable={false}
          selectable={false}
          selectMirror={false}
          dayMaxEvents={1}
          moreLinkClick="none"
          moreLinkContent={(arg: any) => {
            // Try different ways to get the hidden count
            const hiddenCount =
              arg.hiddenSegs?.length ||
              arg.hiddenEvents?.length ||
              arg.num ||
              0;

            if (hiddenCount > 0) {
              return `+${hiddenCount} more`;
            }

            // Fallback: if we have more than 1 event total, show a generic more link
            const totalEvents = arg.allSegs?.length || 0;
            if (totalEvents > 1) {
              return `+${totalEvents - 1} more`;
            }

            return "";
          }}
          weekNumbers={false}
          weekends={showWeekends}
          firstDay={1} // Monday
          dayCellContent={(dayInfo: any) => {
            const date = new Date(dayInfo.date);
            const dayNumber = date.getDate();

            // Check if this is the first day of the month
            if (dayNumber === 1) {
              const monthName = date.toLocaleDateString("en-US", {
                month: "long",
              });
              return (
                <div>
                  <p className="inline-flex items-center gap-2">
                    <span>{monthName}</span>
                    <span>{dayNumber}</span>
                  </p>
                </div>
              );
            }

            return dayNumber;
          }}
          eventContent={(eventInfo: any) => {
            const startTime = new Date(eventInfo.event.start);
            const endTime = new Date(eventInfo.event.end);
            const timeString = `${startTime
              .getHours()
              .toString()
              .padStart(2, "0")}:${startTime
              .getMinutes()
              .toString()
              .padStart(2, "0")} - ${endTime
              .getHours()
              .toString()
              .padStart(2, "0")}:${endTime
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;

            // Get tutor color
            const tutor = transformedTutors.find(
              (t) => t.id === eventInfo.event.extendedProps?.tutorId,
            );
            const tutorColor = tutor?.color || "#3B82F6";
            const status = eventInfo.event.extendedProps?.status;
            const isAvailable = status === "available";

            return (
              <div
                className={`text-white text-sm font-medium w-full ${
                  isAvailable ? "opacity-90" : "opacity-75"
                }`}
                style={{
                  backgroundColor: isAvailable ? tutorColor : status === "booked" ? "var(--color-indigo-600)" : "#6B7280", // Gray for booked sessions
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  padding: "2px 0px 0px 8px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="truncate"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: "0px",
                    paddingLeft: "2px",
                    paddingRight: "8px",
                  }}
                >
                  {t(eventInfo.event.title === "regulars" ? "individual" : eventInfo.event.title)}
                </div>
                <div
                  className="text-xs opacity-80 truncate"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: "0px",
                    paddingBottom: "4px",
                    paddingRight: "8px",
                  }}
                >
                  {timeString}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Event Details Sheet */}
      <EventSheet
        isEventSheetOpen={isEventSheetOpen}
        setIsEventSheetOpen={setIsEventSheetOpen}
        selectedSession={selectedEvent}
        tutorsData={tutorsData}
      />
    </div>
  );
}
