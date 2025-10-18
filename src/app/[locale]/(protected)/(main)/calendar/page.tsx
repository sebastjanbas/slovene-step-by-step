import Calendar from "@/components/calendar/calendar";
import React from "react";

const CalendarPage = () => {
  return (
    <div className="p-5 h-[90vh] md:h-[calc(100vh-80px)] w-full overflow-hidden">
      <Calendar />
    </div>
  );
};

export default CalendarPage;
