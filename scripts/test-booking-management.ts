import { db } from "../src/db";
import { langClubBookingsTable, langClubTable } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function testBookingManagement() {
  console.log("Testing booking management functionality...\n");

  try {
    // Test 1: Check if we have any bookings
    console.log("1. Checking existing bookings...");
    const bookings = await db.query.langClubBookingsTable.findMany();

    console.log(`Found ${bookings.length} bookings:`);
    bookings.forEach((booking) => {
      console.log(`- Booking ID: ${booking.id}, Event ID: ${booking.eventId}, Status: ${booking.status}`);
    });

    // Test 2: Check if we have any events
    console.log("\n2. Checking available events...");
    const events = await db.query.langClubTable.findMany({
      orderBy: (langClubTable, { asc }) => [asc(langClubTable.date)],
    });

    console.log(`Found ${events.length} events:`);
    events.forEach((event) => {
      const spotsLeft = event.maxBooked - event.peopleBooked;
      console.log(`- Event ID: ${event.id}, Theme: ${event.theme}, Spots left: ${spotsLeft}/${event.maxBooked}`);
    });

    // Test 3: Check future events
    console.log("\n3. Checking future events...");
    const now = new Date();
    const futureEvents = events.filter((event) => event.date > now);
    console.log(`Found ${futureEvents.length} future events`);

    // Test 4: Check paid bookings
    console.log("\n4. Checking paid bookings...");
    const paidBookings = bookings.filter((booking) => booking.status === "paid");
    console.log(`Found ${paidBookings.length} paid bookings`);

    console.log("\n✅ Booking management test completed successfully!");
  } catch (error) {
    console.error("❌ Error during test:", error);
  }
}

testBookingManagement(); 