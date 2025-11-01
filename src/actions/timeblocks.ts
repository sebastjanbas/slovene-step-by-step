"use server";

import { db } from "@/db";
import { schedulesTable, timeblocksTable, tutorsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import {TutoringSession} from "@/components/calendar/types";

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


export const bookSession = async (data: TutoringSession) => {
  const {userId} = await auth();

  if (!userId){
    return {message: "Unauthorized", status: 401};
  }

  try {
    const response = await db.insert(timeblocksTable).values({
      tutorId: data.tutorId,
      startTime: data.startTime,
      duration: data.duration,
      status: "booked",
      sessionType: data.sessionType,
      location: data.location,
      studentId: userId
    })
    return {message: "Session booked successfully", status: 200, response: response};
  }catch (error) {
    console.error("Error booking session:", error);
    return {message: "Error booking session", status: 500};
  }
}
