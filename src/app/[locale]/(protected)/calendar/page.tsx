import { getSchedule, getTimeblocks, getTutors } from "@/actions/timeblocks";
import { getRegularSessions, getAllAcceptedRegularInvitations } from "@/actions/regulars";
import Calendar from "@/components/calendar/calendar";
import React from "react";
import {auth} from "@clerk/nextjs/server";

const CalendarPage = async () => {
  const schedule = await getSchedule();
  const timeblocks = await getTimeblocks();
  const tutors = await getTutors();
  const regularSessions = await getRegularSessions();
  const allRegularInvitations = await getAllAcceptedRegularInvitations();
  const {userId} = await auth();


  if (schedule.status !== 200 || timeblocks.status !== 200 || tutors.status !== 200 || !userId) {
    return (
      <div className="text-red-500">
        Error: {schedule.error || timeblocks.error || tutors.error}
      </div>
    );
  }

  return (
    <div className="h-[90vh] md:h-[calc(100vh-80px)] w-full overflow-hidden">
      <Calendar
        studentId={userId}
        scheduleData={schedule.scheduleData}
        timeblocksData={timeblocks.timeblocks}
        tutorsData={tutors.tutors}
        regularSessionsData={regularSessions}
        allRegularInvitations={allRegularInvitations}
      />
    </div>
  );
};

export default CalendarPage;
