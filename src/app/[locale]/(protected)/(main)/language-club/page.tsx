import React from "react";
import LangComponents from "./_components/lang-components";
import BookingToast from "./_components/booking-toast";
import { db } from "@/db";

const LanguageClubPage = async ({ params, searchParams }) => {
  const { locale } = await params;
  const { success, canceled, session_id } = await searchParams;

  // Fetch events from database
  const events = await db.query.langClubTable.findMany({
    orderBy: (langClubTable, { asc }) => [asc(langClubTable.date)],
  });

  // Transform events to match the expected format
  const transformedEvents = events.map((event) => ({
    id: event.id,
    tutor: event.tutor,
    date: event.date,
    theme: event.theme,
    description: event.description || "",
    level: event.level || "",
    location: event.location,
    maxBooked: event.maxBooked || 8,
    spotsLeft: event.maxBooked - event.peopleBooked || 0,
    duration: event.duration || 45,
    price: parseFloat(event.price.toString()),
    stripeProductId: event.stripeProductId,
    stripePriceId: event.stripePriceId,
  }));

  // Transform events for calendar display
  const calendarEvents = events.map((event) => ({
    id: event.id.toString(),
    date: event.date,
    title: event.theme,
    color: "bg-pink-200", // You can customize colors based on level or other criteria
  }));

  // Handle success state - will be shown in dialog
  let bookedEvent = null;

  if (success && session_id) {
    try {
      // Get session details from Stripe to find the correct event
      const sessionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/get-session?session_id=${session_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        const eventId = parseInt(sessionData.eventId);

        bookedEvent = transformedEvents.find((event) => event.id === eventId);
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
    }
  }

  return (
    <div className="p-5 flex flex-col md:flex-row h-auto w-full md:min-h-[800px] md:overflow-hidden justify-center items-center md:items-start gap-5 mb-20">
      <BookingToast canceled={canceled} />
      <LangComponents
        events={transformedEvents}
        calendarEvents={calendarEvents}
        locale={locale}
        bookedEvent={bookedEvent}
      />
    </div>
  );
};

export default LanguageClubPage;
