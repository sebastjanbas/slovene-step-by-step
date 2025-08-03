import { NextResponse } from "next/server";
import { db } from "@/db";
import { langClubTable } from "@/db/schema";

export async function GET() {
  try {
    // Test database connection by counting events
    const eventCount = await db.select().from(langClubTable).execute();
    
    return NextResponse.json({
      status: "healthy",
      database: "connected",
      eventCount: eventCount.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 