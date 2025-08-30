'use server'

import { eventSchema } from '@/app/[locale]/(protected)/admin/language-club-admin/_components/add-event-form'
import { db } from '@/db'
import { langClubBookingsTable, langClubTable } from '@/db/schema'
import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'
import { eq, ilike } from 'drizzle-orm'
import z from 'zod'

export async function setRole(formData: FormData) {
  const client = await clerkClient()

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized', success: false }
  }

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return { message: res.publicMetadata, success: true }
  } catch (err) {
    return { message: err, success: false }
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient()

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    })
    return { message: res.publicMetadata, success: true }
  } catch (err) {
    return { message: err, success: false }
  }
}


export async function getUsers(search: string | null) {

  const client = await clerkClient();

  const users = search ? (await client.users.getUserList({
    query: search,
  })).data : (await client.users.getUserList()).data;

  return {
    users: users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0].emailAddress,
      role: user.publicMetadata.role,
    })),
  };
}
export async function addEvent(values:z.infer<typeof eventSchema>) {
  const formattedDate = values.date.split('T')[0] + 'T' + values.time + ':00.000+02:00'
  try {
    await db.insert(langClubTable).values({
      theme: values.theme,
      tutor: values.tutor,
      date: new Date(formattedDate),
      description: values.description,
      price: values.price,
      level: values.level,
      duration: Number(values.duration),
      location: values.location,
      peopleBooked: 0,
      maxBooked: Number(values.spots),
      stripeProductId: null,
      stripePriceId: null,
    });
    return { message: 'Event added', success: true }
  } catch (error) {
    console.error(error);
    return { message: 'Error adding event', success: false }
  }
}

export async function editEvent(values:z.infer<typeof eventSchema>, id: number) {
  const formattedDate = values.date.split('T')[0] + 'T' + values.time + ':00.000+02:00'
  try {
    await db.update(langClubTable).set({
      theme: values.theme,
      tutor: values.tutor,
      date: new Date(formattedDate),
      description: values.description,
      price: values.price,
      level: values.level,
      duration: Number(values.duration),
      location: values.location,
      maxBooked: Number(values.spots),
    }).where(eq(langClubTable.id, id));
    return { message: 'Event edited', success: true }
  } catch (error) {
    console.error(error);
    return { message: 'Error editing event', success: false }
  }
}

export async function getBookingById(id: number) {
  try {
    const booking = await db.query.langClubTable.findFirst({
      where: eq(langClubTable.id, id),
    });
    return booking;
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getBookingByTheme(theme: string) {
  try {
    const booking = await db.query.langClubTable.findMany({
      where: ilike(langClubTable.theme, `%${theme}%`),
    });
    console.log(booking);
    return booking;
  } catch (error) {
    console.error(error);
    return []
  }
}

export const getPeopleBooked = async (bookingId: number) => {
  const client = await clerkClient();
  try {
    const users = await db.select({
      status: langClubBookingsTable.status,
      userId: langClubBookingsTable.userId,
    }).from(langClubBookingsTable).innerJoin(langClubTable, eq(langClubBookingsTable.eventId, langClubTable.id))
    .where(eq(langClubTable.id, bookingId));
    const usersWithNames = await Promise.all(users.map(async (user: { userId: string, status: string }) => {
      const userData = await client.users.getUser(user.userId);
      return {
        ...user,
        status: user.status,
        coverImage: userData.imageUrl,
        name: userData.fullName,
        email: userData.emailAddresses[0].emailAddress,
      };
    }));

    return usersWithNames;

  } catch (error) {
    console.error(error);
    return []
  }
}

export const deleteEvent = async (id: number) => {
  try {
    await db.delete(langClubTable).where(eq(langClubTable.id, id));
    return { message: 'Event deleted', success: true }
  } catch (error) {
    console.error(error);
    if (error?.cause?.code === "23503") {
      return { message: 'Event is associated with a booking', success: false }
    }
    return { message: 'Error deleting event', success: false }
  }
}