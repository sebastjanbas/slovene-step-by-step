"use server";

import {db} from "@/db";
import {regularInvitationsTable, tutorsTable} from "@/db/schema";
import {auth} from "@clerk/nextjs/server";
import {and, eq} from "drizzle-orm";
import {addMonths, addWeeks, isAfter, isBefore, setDay, setHours, setMinutes, startOfDay} from "date-fns";

export interface RegularSession {
  id: string;
  invitationId: number;
  tutorId: number;
  startTime: Date;
  duration: number;
  status: "booked";
  sessionType: string;
  location: string;
  studentId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
  description: string | null;
  isRecurring: true;
  dayOfWeek: number;
}

interface RegularInvitation {
  id: number;
  tutorId: number;
  studentClerkId: string | null;
  status: string;
  dayOfWeek: number;
  startTime: string;
  duration: number;
  location: string;
  description: string | null;
  color: string | null;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
}

/**
 * Fetches all accepted regular invitations for the current user
 */
export async function getRegularInvitations(): Promise<RegularInvitation[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  return db
    .select({
      id: regularInvitationsTable.id,
      tutorId: regularInvitationsTable.tutorId,
      studentClerkId: regularInvitationsTable.studentClerkId,
      status: regularInvitationsTable.status,
      dayOfWeek: regularInvitationsTable.dayOfWeek,
      startTime: regularInvitationsTable.startTime,
      duration: regularInvitationsTable.duration,
      location: regularInvitationsTable.location,
      description: regularInvitationsTable.description,
      color: regularInvitationsTable.color,
      tutorName: tutorsTable.name,
      tutorAvatar: tutorsTable.avatar,
      tutorColor: tutorsTable.color,
    })
    .from(regularInvitationsTable)
    .where(
      and(
        eq(regularInvitationsTable.studentClerkId, userId),
        eq(regularInvitationsTable.status, "accepted")
      )
    )
    .innerJoin(tutorsTable, eq(regularInvitationsTable.tutorId, tutorsTable.id));
}

/**
 * Generates recurring sessions from accepted regular invitations
 * Creates weekly occurrences for a 3-month rolling window
 */
export async function generateRecurringSessions(
  invitations: RegularInvitation[],
  studentId: string
): Promise<RegularSession[]> {
  const sessions: RegularSession[] = [];
  const now = new Date();
  const threeMonthsFromNow = addMonths(now, 3);
  const today = startOfDay(now);

  for (const invitation of invitations) {
    // Parse the start time (format: "HH:mm")
    const [hours, minutes] = invitation.startTime.split(":").map(Number);

    // Find the first occurrence of this day of week from today
    let currentDate = setDay(today, invitation.dayOfWeek, { weekStartsOn: 1 });

    // If the day has already passed this week, move to next week
    if (isBefore(currentDate, today)) {
      currentDate = addWeeks(currentDate, 1);
    }

    // Generate sessions for the next 3 months
    while (isBefore(currentDate, threeMonthsFromNow)) {
      // Create the full datetime
      let sessionDateTime = setHours(currentDate, hours);
      sessionDateTime = setMinutes(sessionDateTime, minutes);

      // Only include future sessions
      if (isAfter(sessionDateTime, now)) {
        sessions.push({
          id: `regular-${invitation.id}-${sessionDateTime.toISOString()}`,
          invitationId: invitation.id,
          tutorId: invitation.tutorId,
          startTime: sessionDateTime,
          duration: invitation.duration,
          status: "booked",
          sessionType: "Regular Session",
          location: invitation.location,
          studentId: studentId,
          tutorName: invitation.tutorName,
          tutorAvatar: invitation.tutorAvatar,
          tutorColor: invitation.color || invitation.tutorColor,
          description: invitation.description,
          isRecurring: true,
          dayOfWeek: invitation.dayOfWeek,
        });
      }

      // Move to next week
      currentDate = addWeeks(currentDate, 1);
    }
  }

  // Sort by start time
  return sessions.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

/**
 * Combined function to fetch and generate regular sessions for the current user
 */
export async function getRegularSessions(): Promise<RegularSession[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const invitations = await getRegularInvitations();
  return generateRecurringSessions(invitations, userId);
}
