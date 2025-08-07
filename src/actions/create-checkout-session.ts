"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { langClubBookingsTable, langClubTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

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