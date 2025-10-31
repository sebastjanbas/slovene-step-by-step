"use server";

import { db } from "@/db";
import { schedulesTable, timeblocksTable, tutorsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const getSchedule = async () => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const schedule = await db.select().from(schedulesTable);
    return { success: true, scheduleData: schedule };
  } catch (error) {
    console.error("Error getting schedules:", error);
    return { error: "Internal server error", status: 500 };
  }
};

export const getTimeblocks = async () => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const timeblocks = await db.select().from(timeblocksTable);
    return { success: true, timeblocks: timeblocks };
  } catch (error) {
    console.error("Error getting timeblocks:", error);
    return { error: "Internal server error", status: 500 };
  }
};

export const getTutors = async () => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const tutors = await db.select().from(tutorsTable);
    return { success: true, tutors: tutors };
  } catch (error) {
    console.error("Error getting tutors:", error);
    return { error: "Internal server error", status: 500 };
  }
};
