import { db } from "../src/db";
import { langClubBookingsTable, langClubTable } from "../src/db/schema";
import { eq, and } from "drizzle-orm";

async function testCancelBooking() {
  console.log("Testing cancel booking functionality...\n");

  try {
    // Test 1: Check current bookings
    console.log("1. Checking current bookings...");
    const bookings = await db.query.langClubBookingsTable.findMany({
      where: eq(langClubBookingsTable.status, "paid"),
    });

    console.log(`Found ${bookings.length} paid bookings:`);
    bookings.forEach((booking) => {
      console.log(`- Booking ID: ${booking.id}, Event ID: ${booking.eventId}, Status: ${booking.status}`);
    });

    if (bookings.length === 0) {
      console.log("No paid bookings found to test cancellation.");
      return;
    }

    // Test 2: Get the first booking's event details
    const firstBooking = bookings[0];
    const event = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, firstBooking.eventId),
    });

    if (!event) {
      console.log("Event not found for the booking.");
      return;
    }

    console.log(`\n2. Event details for booking ${firstBooking.id}:`);
    console.log(`- Event ID: ${event.id}`);
    console.log(`- Theme: ${event.theme}`);
    console.log(`- Date: ${event.date}`);
    console.log(`- People booked: ${event.peopleBooked}/${event.maxBooked}`);

    // Test 3: Check if event is in the future
    const now = new Date();
    const isFutureEvent = event.date > now;
    console.log(`\n3. Event timing check:`);
    console.log(`- Current time: ${now}`);
    console.log(`- Event time: ${event.date}`);
    console.log(`- Is future event: ${isFutureEvent}`);

    if (!isFutureEvent) {
      console.log("⚠️  Event is in the past - cancellation would be blocked");
    } else {
      console.log("✅ Event is in the future - cancellation would be allowed");
    }

    // Test 4: Simulate cancellation logic (without actually cancelling)
    console.log(`\n4. Simulating cancellation for booking ${firstBooking.id}:`);
    console.log(`- Current booking status: ${firstBooking.status}`);
    console.log(`- Current event capacity: ${event.peopleBooked}/${event.maxBooked}`);
    console.log(`- After cancellation, capacity would be: ${event.peopleBooked - 1}/${event.maxBooked}`);

    console.log("\n✅ Cancel booking test completed successfully!");
    console.log("\nTo test actual cancellation, use the UI or make a POST request to:");
    console.log(`POST /api/admin/language-club/cancel-booking`);
    console.log(`Body: { "bookingId": ${firstBooking.id} }`);

  } catch (error) {
    console.error("❌ Error during test:", error);
  }
}

testCancelBooking(); 