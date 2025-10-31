import { db } from "@/db";
import { langClubBookingsTable } from "@/db/schema";

// Test data for webhook simulation
const testSessionData = {
  id: "cs_test_session_123",
  payment_intent: "pi_test_payment_123",
  metadata: {
    eventId: "1", // Change this to match an actual event ID
    userId: "test_user_123",
  },
  amount_total: 2500, // 25.00 EUR in cents
};

async function testWebhook() {
  try {
    console.log("Testing webhook event simulation...");
    
    // Simulate checkout.session.completed event
    const bookingData = {
      eventId: parseInt(testSessionData.metadata.eventId),
      userId: testSessionData.metadata.userId,
      stripeSessionId: testSessionData.id,
      stripePaymentIntentId: testSessionData.payment_intent,
      amount: (testSessionData.amount_total / 100).toString(),
      status: "paid",
    };

    console.log("Creating test booking:", bookingData);

    // Insert test booking
    const result = await db.insert(langClubBookingsTable).values(bookingData).returning();
    
    console.log("✅ Test booking created successfully!");
    console.log("Booking ID:", result[0].id);
    console.log("Event ID:", result[0].eventId);
    console.log("Status:", result[0].status);
    
  } catch (error) {
    console.error("❌ Error creating test booking:", error);
  } finally {
    process.exit(0);
  }
}

testWebhook(); 