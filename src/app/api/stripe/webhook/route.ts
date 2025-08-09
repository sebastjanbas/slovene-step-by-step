import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { langClubBookingsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Create booking record after successful payment
        await db.insert(langClubBookingsTable).values({
          eventId: parseInt(session.metadata?.eventId || "0"),
          userId: session.metadata?.userId || "",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          amount: session.amount_total ? (session.amount_total / 100).toString() : "0",
          status: "paid",
        });
        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update booking status to failed
        await db
          .update(langClubBookingsTable)
          .set({
            status: "failed",
            updatedAt: new Date(),
          })
          .where(eq(langClubBookingsTable.stripePaymentIntentId, paymentIntent.id));
        break;

      case "charge.refunded":
        const charge = event.data.object as Stripe.Charge;
        
        // Update booking status to refunded
        await db
          .update(langClubBookingsTable)
          .set({
            status: "refunded",
            updatedAt: new Date(),
          })
          .where(eq(langClubBookingsTable.stripePaymentIntentId, charge.payment_intent as string));
        break;

      case "charge.refund.updated":
        const refund = event.data.object as Stripe.Refund;
        
        // Update booking status based on refund status
        let refundStatus = "refunded";
        if (refund.status === "failed") {
          refundStatus = "paid"; // Revert back to paid if refund failed
        } else if (refund.status === "pending") {
          refundStatus = "refund_pending";
        }
        
        await db
          .update(langClubBookingsTable)
          .set({
            status: refundStatus,
            updatedAt: new Date(),
          })
          .where(eq(langClubBookingsTable.stripePaymentIntentId, refund.payment_intent as string));
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 