import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { langClubTable, langClubBookingsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    // Get the event details
    const event = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, eventId),
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if user already has a paid booking for this specific event
    const existingBooking = await db.query.langClubBookingsTable.findFirst({
      where: and(
        eq(langClubBookingsTable.userId, userId), 
        eq(langClubBookingsTable.eventId, eventId),
        eq(langClubBookingsTable.status, "paid")
      ),
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "You already have a booking for this event" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/language-club?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/language-club?canceled=true`,
      metadata: {
        eventId: event.id.toString(),
        userId: userId,
      },
    });

    // Note: Booking record will be created after successful payment via webhook
    // This prevents creating pending bookings for cancelled sessions

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 