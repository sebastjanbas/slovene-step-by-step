/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { TutoringSession, EventClickArg } from "@/components/calendar/types";
import { CalendarControls } from "@/components/calendar/calendar-controls";
import { EventSheet } from "@/components/calendar/event-sheet";
import "@/components/calendar/calendar-styles.css";
import { useLocale } from "next-intl";

// Transform database tutors to the format expected by the calendar
const transformTutors = (tutorsData: any[]) => {
  return tutorsData.map((tutor) => ({
    id: tutor.id.toString(),
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
  timeblocksData: any[]
) => {
  const availableSlots: TutoringSession[] = [];
  const now = new Date();
  const fourWeeksFromNow = new Date(
    now.getTime() + 4 * 7 * 24 * 60 * 60 * 1000
  );

  // Get all booked timeblocks for the next 4 weeks
  const bookedTimeblocks = timeblocksData.filter((timeblock) => {
    const startTime = new Date(timeblock.startTime);
    return startTime >= now && startTime <= fourWeeksFromNow;
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
            (scheduleDay: any) => scheduleDay.day === dayOfTheWeek%7
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
                slotStart.getTime() + timeSlot.duration * 60000
              );

              // Skip if this slot is in the past
              if (slotStart < now) return;

              // Check if this time slot is already booked
              const isBooked = bookedTimeblocks.some((booked) => {
                const bookedStart = new Date(booked.startTime);
                const bookedEnd = new Date(
                  bookedStart.getTime() + booked.duration * 60000
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
                  tutorId: tutor.id.toString(),
                  tutorName: tutor.name,
                  startTime: slotStart,
                  endTime: slotEnd,
                  duration: duration,
                  status: "available",
                  sessionType: "Available Slot",
                  location: "Online", // Default location
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
  tutorsData: any[]
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
    };
  });
};

interface CalendarProps {
  scheduleData: any;
  timeblocksData: any;
  tutorsData: any;
}

export default function Calendar({
  scheduleData,
  timeblocksData,
  tutorsData,
}: CalendarProps) {
  const locale = useLocale();

  // Transform the data from a database
  const transformedTutors = transformTutors(tutorsData);

  // Generate available slots from schedules
  const availableSlots = generateAvailableSlots(
    scheduleData,
    tutorsData,
    timeblocksData
  );

  // Get booked sessions (only future ones)
  const bookedSessions = transformTimeblocksToSessions(
    timeblocksData,
    tutorsData
  ).filter((session) => session.startTime >= new Date());

  // Combine available slots and booked sessions
  const allSessions = useMemo(
    () => [...availableSlots, ...bookedSessions],
    [availableSlots, bookedSessions]
  );

  const [selectedEvent, setSelectedEvent] = useState<TutoringSession | null>(
    null
  );
  const [isEventSheetOpen, setIsEventSheetOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [calendarTitle, setCalendarTitle] = useState("Calendar");
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [showWeekends, setShowWeekends] = useState(true);
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  // Filter events based on the selected tutor
  const events = useMemo(() => {
    if (selectedTutorId === null) {
      return allSessions;
    } else {
      return allSessions.filter((event) => event.tutorId === selectedTutorId);
    }
  }, [allSessions, selectedTutorId]);
  const calendarRef = useRef<FullCalendar>(null);

  // Initialize calendar title
  useEffect(() => {
    const timer = setTimeout(() => {
      updateCalendarTitle();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleTutorSelect = (tutorId: string | null) => {
    setSelectedTutorId(tutorId);
  };

  const changeView = useCallback((viewName: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewName);
      setCurrentView(viewName);
      updateCalendarTitle();
    }
  }, []);

  const handleMoreEventsClick = useCallback(
    (date: Date) => {
      console.log("Clicked date:", date);

      // Find the start of the week (Monday) for the clicked date
      // FullCalendar typically uses Monday as the start of the week
      const startOfWeek = new Date(date);
      const dayOfWeek = startOfWeek.getDay(); // 0 = Sunday, 1 = Monday, etc.

      // Adjust to Monday start (if Sunday, go back 6 days; otherwise go back to Monday)
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(startOfWeek.getDate() - daysToSubtract);

      console.log("Calculated start of week:", startOfWeek);
      console.log(
        "Day of week was:",
        dayOfWeek,
        "Days to subtract:",
        daysToSubtract
      );

      // Set the calendar-to-week view and navigate to that week
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        // Navigate to the specific date first
        calendarApi.gotoDate(startOfWeek);
        // Use the existing changeView function to properly update the state
        changeView("timeGridWeek");
      }
    },
    [changeView]
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
          console.log("Date string from element:", dateStr);
          if (dateStr) {
            // Parse the date string and create a proper Date object
            const date = new Date(dateStr + "T00:00:00");
            console.log("Parsed date:", date);
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
  const handleEventCreate = () => {
    // Event creation is handled by the parent component
    // This is a placeholder for future functionality
  };

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
    <div className="h-full flex flex-col">
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
          handleEventCreate={handleEventCreate}
          tutors={transformedTutors}
          selectedTutorId={selectedTutorId}
          onTutorSelect={handleTutorSelect}
        />
      </div>

      {/* FullCalendar Component */}
      <div className="flex-1 min-h-0 h-screen">
        <FullCalendar
          locale={locale}
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
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

            // Temporary debug: always show a more link for testing
            if (arg.allSegs && arg.allSegs.length > 0) {
              return "+2 more (debug)";
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
              (t) => t.id === eventInfo.event.extendedProps?.tutorId
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
                  backgroundColor: isAvailable ? tutorColor : "#6B7280", // Gray for booked sessions
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
                  }}
                >
                  {eventInfo.event.title}
                </div>
                <div
                  className="text-xs opacity-80 truncate"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: "0px",
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
