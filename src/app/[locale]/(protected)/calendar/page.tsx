import { getSchedule, getTimeblocks, getTutors } from "@/actions/timeblocks";
import Calendar from "@/components/calendar/calendar";
import React from "react";

const CalendarPage = async () => {
  const schedule = await getSchedule();
  const timeblocks = await getTimeblocks();
  const tutors = await getTutors();

  if (!schedule.success || !timeblocks.success || !tutors.success) {
    return (
      <div className="text-red-500">
        Error: {schedule.error || timeblocks.error || tutors.error}
      </div>
    );
  }

  return (
    <div className="p-5 h-[90vh] md:h-[calc(100vh-80px)] w-full overflow-hidden">
      <Calendar
        scheduleData={schedule.scheduleData}
        timeblocksData={timeblocks.timeblocks}
        tutorsData={tutors.tutors}
      />
    </div>
  );
};

export default CalendarPage;
