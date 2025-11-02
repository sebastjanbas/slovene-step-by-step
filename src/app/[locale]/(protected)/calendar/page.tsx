import { getSchedule, getTimeblocks, getTutors } from "@/actions/timeblocks";
import Calendar from "@/components/calendar/calendar";
import React from "react";
import {auth} from "@clerk/nextjs/server";

const CalendarPage = async () => {
  const schedule = await getSchedule();
  const timeblocks = await getTimeblocks();
  const tutors = await getTutors();
  const {userId} = await auth();

  if (!schedule.success || !timeblocks.success || !tutors.success || !userId) {
    return (
      <div className="text-red-500">
        Error: {schedule.error || timeblocks.error || tutors.error}
      </div>
    );
  }

  return (
    <div className="p-5 h-[90vh] md:h-[calc(100vh-80px)] w-full overflow-hidden">
      <Calendar
        studentId={userId}
        scheduleData={schedule.scheduleData}
        timeblocksData={timeblocks.timeblocks}
        tutorsData={tutors.tutors}
      />
    </div>
  );
};

export default CalendarPage;
