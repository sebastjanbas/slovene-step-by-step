import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { langClubTable } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Add proper admin role check
    // For now, we'll allow any authenticated user to create events
    // In production, you should check if the user has admin privileges

    const {
      tutor,
      date,
      theme,
      description,
      level,
      location,
      maxPeople,
      duration,
      price,
    } = await request.json();

    // Validate required fields
    if (!tutor || !date || !theme || !location || !maxPeople || !duration || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the event
    const newEvent = await db.insert(langClubTable).values({
      tutor,
      date: new Date(date),
      theme,
      description,
      level,
      location,
      maxPeople,
      duration,
      price: price.toString(),
    }).returning();

    return NextResponse.json({ 
      success: true, 
      event: newEvent[0] 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 