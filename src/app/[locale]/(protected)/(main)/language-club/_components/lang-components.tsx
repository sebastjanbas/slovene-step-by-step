"use client";
import React, { useState } from "react";
import LangCalendar from "./lang-calendar";
import LangCard from "./lang-card";

const LangComponents = ({ events, locale }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const filteredEvents = events.filter((event) => {
    const selectedDate = date.toLocaleDateString("sv-SE"); // Local, correct timezone
    return event.date === selectedDate;
  });
  return (
    <>
      <div className="w-full max-w-4xl">
        <div className="relative w-full flex items-start justify-center h-full">
          <LangCalendar
            events={events}
            locale={locale}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
      <div className="overflow-y-scroll flex flex-col justify-center items-center bg-red-300">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <LangCard event={event} locale={locale} key={event.id} />
          ))
        ) : (
          <p>
            No events scheduled on{" "}
            {date.toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </>
  );
};

export default LangComponents;
