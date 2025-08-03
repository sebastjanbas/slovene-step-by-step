import { db } from "../src/db";
import { langClubBookingsTable } from "../src/db/schema";

async function testCompleteFlow() {
  try {
    console.log("🧪 Testing complete booking flow...");
    
    // 1. Check if we have events
    const events = await db.query.langClubTable.findMany();
    console.log(`📅 Found ${events.length} events in database`);
    
    if (events.length === 0) {
      console.log("❌ No events found. Please run the seed script first.");
      return;
    }
    
    // 2. Check existing bookings
    const bookings = await db.query.langClubBookingsTable.findMany();
    console.log(`📋 Found ${bookings.length} existing bookings`);
    
    // 3. Simulate a new booking
    const testEvent = events[0];
    const testBooking = {
      eventId: testEvent.id as number,
      userId: "test_user_123",
      stripeSessionId: "cs_test_session_" + Date.now(),
      stripePaymentIntentId: "pi_test_payment_" + Date.now(),
      amount: testEvent.price.toString(),
      status: "paid",
    };
    
    console.log("💳 Creating test booking for event:", testEvent.theme);

    let result;
    try {
      result = await db
        .insert(langClubBookingsTable)
        .values(testBooking)
        .returning();
    } catch (err) {
      console.error("❌ Failed to create test booking:", err);
      throw err;
    }

    if (!result || result.length === 0) {
      throw new Error("Test booking was not created or no result returned.");
    }

    console.log("✅ Test booking created successfully!");
    console.log("   Booking ID:", result[0].id);
    console.log("   Event:", testEvent.theme);
    console.log("   Amount:", result[0].amount);
    console.log("   Status:", result[0].status);
    
    // 4. Verify the booking was created
    const newBookings = await db.query.langClubBookingsTable.findMany();
    console.log(`📊 Total bookings after test: ${newBookings.length}`);
    
  } catch (error) {
    console.error("❌ Error in test flow:", error);
  } finally {
    process.exit(0);
  }
}

testCompleteFlow(); 