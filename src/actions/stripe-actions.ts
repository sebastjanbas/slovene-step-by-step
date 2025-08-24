"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { langClubBookingsTable, langClubTable } from "@/db/schema";
import { and, eq, gt, ne, or } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

// Direct booking without Stripe checkout
export const bookEventDirect = async (eventId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!eventId) {
      return { error: "Event ID is required", status: 400 };
    }

    // Get the event details
    const event = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, Number(eventId)),
    });

    if (!event) {
      return { error: "Event not found", status: 404 };
    }

    if (event.peopleBooked >= event.maxBooked) {
      return { error: "Event is full", status: 400 };
    }

    // Check if user already has a booking for this specific event
    const existingBooking = await db.query.langClubBookingsTable.findFirst({
      where: and(
        eq(langClubBookingsTable.userId, userId), 
        eq(langClubBookingsTable.eventId, Number(eventId)),
        or(
          eq(langClubBookingsTable.status, "paid"),
          eq(langClubBookingsTable.status, "booked")
        )
      ),
    });

    if (existingBooking) {
      return { 
        error: "You already have a booking for this event", 
        status: 400 
      };
    }

    // Create booking record directly with paid status
    const booking = await db.insert(langClubBookingsTable).values({
      eventId: Number(eventId),
      userId: userId,
      status: "booked",
      amount: event.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // Update the event to increase people booked
    await db
      .update(langClubTable)
      .set({
        peopleBooked: event.peopleBooked + 1,
      })
      .where(eq(langClubTable.id, Number(eventId)));

    return { 
      success: true, 
      bookingId: booking[0].id,
      event: {
        id: event.id,
        theme: event.theme,
        date: event.date,
        tutor: event.tutor,
        location: event.location,
        duration: event.duration,
        description: event.description,
        level: event.level,
      }
    };

  } catch (error) {
    console.error("Error booking event directly:", error);
    return { error: "Internal server error", status: 500 };
  }
};

export const createCheckoutSession = async (eventId: string, locale: "en" | "it" | "sl" | "ru") => {
    try {
        const { userId } = await auth();
        if (!userId) {
          return { error: "Unauthorized", status: 401 };
        }
    
        if (!eventId) {
          return { error: "Event ID is required", status: 400 };
        }
    
        // Get the event details
        const event = await db.query.langClubTable.findFirst({
          where: eq(langClubTable.id, Number(eventId)),
        });

        if (!event) {
          return { error: "Event not found", status: 404 };
        }

        if (event.peopleBooked >= event.maxBooked) {
          return { error: "Event is full", status: 400 };
        }
    
        // Check if user already has a paid booking for this specific event
        const existingBooking = await db.query.langClubBookingsTable.findFirst({
          where: and(
            eq(langClubBookingsTable.userId, userId), 
            eq(langClubBookingsTable.eventId, Number(eventId)),
            eq(langClubBookingsTable.status, "paid")
          ),
        });
    
        if (existingBooking) {
          return { 
            error: "You already have a booking for this event", 
            status: 400 
          };
        }
    
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card", "paypal"],
          locale: locale,
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `Language Club: ${event.theme}`,
                  description: event.description || "",
                  metadata: {
                    eventId: event.id.toString(),
                    tutor: event.tutor,
                    level: event.level || "",
                    location: event.location,
                    duration: event.duration?.toString() || "",
                  },
                },
                unit_amount: Math.round(parseFloat(event.price.toString()) * 100), // Convert to cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/language-club?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/language-club?canceled=true`,
          metadata: {
            eventId: event.id.toString(),
            userId: userId,
          },
        });
    
        // Note: Booking record will be created after successful payment via webhook
        // This prevents creating pending bookings for cancelled sessions
    
        return { sessionId: session.id, url: session.url };
      } catch (error) {
        console.error("Error creating checkout session:", error);
        return { error: "Internal server error", status: 500 };
      }
}


export const rescheduleBooking = async (bookingId: string, newEventId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!bookingId || !newEventId) {
      return { error: "Booking ID and new event ID are required", status: 400 };
    }

    // Get the current booking details
    const currentBooking = await db.query.langClubBookingsTable.findFirst({
      where: and(
        eq(langClubBookingsTable.id, Number(bookingId)),
        eq(langClubBookingsTable.userId, userId),
        or(
          eq(langClubBookingsTable.status, "paid"),
          eq(langClubBookingsTable.status, "booked")
        ),
      ),
    });

    if (!currentBooking) {
      return { error: "Booking not found or already cancelled", status: 404 };
    }

    // Get the current event details
    const currentEvent = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, currentBooking.eventId),
    });

    if (!currentEvent) {
      return { error: "Current event not found", status: 404 };
    }

    // Get the new event details
    const newEvent = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, Number(newEventId)),
    });

    if (!newEvent) {
      return { error: "New event not found", status: 404 };
    }

    // Check if the current event is in the future
    const now = new Date();
    if (currentEvent.date <= now) {
      return { error: "Cannot reschedule past events", status: 400 };
    }

    // Check if the new event has available spots
    if (newEvent.peopleBooked >= newEvent.maxBooked) {
      return { error: "New event is full", status: 400 };
    }

    // Check if user already has a booking for the new event
    const existingBooking = await db.query.langClubBookingsTable.findFirst({
      where: and(
        eq(langClubBookingsTable.userId, userId),
        eq(langClubBookingsTable.eventId, Number(newEventId)),
        or(
          eq(langClubBookingsTable.status, "paid"),
          eq(langClubBookingsTable.status, "booked")
        )
      ),
    });

    if (existingBooking) {
      return { error: "You already have a booking for this event", status: 400 };
    }

    // Start a transaction to update both events and the booking
    await db.transaction(async (tx) => {
      // Update the booking to point to the new event
      await tx
        .update(langClubBookingsTable)
        .set({
          eventId: Number(newEventId),
          updatedAt: new Date(),
        })
        .where(eq(langClubBookingsTable.id, Number(bookingId)));

      // Decrease people booked for the old event
      await tx
        .update(langClubTable)
        .set({
          peopleBooked: currentEvent.peopleBooked - 1,
        })
        .where(eq(langClubTable.id, currentBooking.eventId));

      // Increase people booked for the new event
      await tx
        .update(langClubTable)
        .set({
          peopleBooked: newEvent.peopleBooked + 1,
        })
        .where(eq(langClubTable.id, Number(newEventId)));
    });

    return { 
      success: true, 
      message: "Booking rescheduled successfully",
      newEvent: {
        id: newEvent.id,
        theme: newEvent.theme,
        date: newEvent.date,
        tutor: newEvent.tutor,
        location: newEvent.location,
      }
    };

  } catch (error) {
    console.error("Reschedule booking error:", error);
    return { error: "Internal server error", status: 500 };
  }
}

export const getAvailableEvents = async (currentEventId: number) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized",status: 401 };
    }


    if (!currentEventId) {
      return { error: "Current event ID is required", status: 400 };
    }

    // Get all future events that are not the current event
    const now = new Date();
    const events = await db.query.langClubTable.findMany({
      where: and(
        gt(langClubTable.date, now),
        ne(langClubTable.id, currentEventId)
      ),
      orderBy: (langClubTable, { asc }) => [asc(langClubTable.date)],
    });

    // Transform events to include calculated fields
    const transformedEvents = events.map((event) => ({
      id: event.id,
      tutor: event.tutor,
      date: event.date,
      theme: event.theme,
      description: event.description || "",
      level: event.level || "",
      location: event.location,
      maxBooked: event.maxBooked || 8,
      peopleBooked: event.peopleBooked || 0,
      duration: event.duration || 45,
      price: parseFloat(event.price.toString()),
      stripeProductId: event.stripeProductId,
      stripePriceId: event.stripePriceId,
    }));

    return { 
      success: true, 
      events: transformedEvents 
    };

  } catch (error) {
    console.error("Fetch available events error:", error);
    return { error: "Internal server error", status: 500 };
  }
}


export const cancelBooking = async (bookingId: number) => {
  try {

    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!bookingId) {
      return { error: "Booking ID is required", status: 400 };
    }

    // Get the booking details
    const booking = await db.query.langClubBookingsTable.findFirst({
      where: and(
        eq(langClubBookingsTable.id, bookingId),
        eq(langClubBookingsTable.userId, userId),
        or(
          eq(langClubBookingsTable.status, "paid"),
          eq(langClubBookingsTable.status, "booked")
        )
      ),
    });

    if (!booking) {
      return { error: "Booking not found or already cancelled", status: 404 };
    }

    // Get the event details
    const event = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, booking.eventId),
    });

    if (!event) {
      return { error: "Event not found", status: 404 };
    }

    // Check if the event is in the future (allow cancellation only for future events)
    const now = new Date();
    if (event.date <= now) {
      return { error: "Cannot cancel past events", status: 400 };
    }

    if (booking.status === "paid") {

    // Process Stripe refund
    let refund;
    try {
      refund = await stripe.refunds.create({
        payment_intent: booking.stripePaymentIntentId!,
        reason: "requested_by_customer",
      });
    } catch (stripeError) {
      console.error("Stripe refund error:", stripeError);
      return { error: "Failed to process refund", status: 500 };
    }

    // Update booking status to refunded is managed by webhook

    // Decrease the number of people booked for the event
    await db
      .update(langClubTable)
      .set({
        peopleBooked: event.peopleBooked - 1,
      })
      .where(eq(langClubTable.id, booking.eventId));

    return { 
      success: true, 
      refundId: refund.id,
      message: "Booking cancelled successfully. Refund will be processed." 
    };
  } else {
    // Update booking status to cancelled
    await db
      .update(langClubBookingsTable)
      .set({
        status: "cancelled",
        updatedAt: new Date(),
      })
      .where(eq(langClubBookingsTable.id, bookingId));

    return { 
      success: true, 
      message: "Booking cancelled successfully" 
    };
  }

  } catch (error) {
    console.error("Cancel booking error:", error);
    return { error: "Internal server error", status: 500 };
  }
}