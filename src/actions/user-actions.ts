"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export interface UserPreferences {
  languageLevel: string;
  preferredTutor: number;
  learningGoals: string[];
  preferredSchedule: string;
}

export const updateUserPreferences = async (preferences: UserPreferences) => {
  const client = await clerkClient();
  const { userId } = await auth();
  if (!userId) {
    return new Error("User not found");
  }

  try {
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        preferences,
      },
    });

    return null;
  } catch (error) {
    console.error("Error saving preferences:", error);
    return error;
  }
};

export const getUserPreferences = async () => {
  const client = await clerkClient();
  const { userId } = await auth();
  if (!userId) {
    return new Error("User not found");
  }
  try {
    const user = await client.users.getUser(userId);
    return user.privateMetadata.preferences;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return error;
  }
};

export const updateLanguageLevel = async (languageLevel: string) => {
  const client = await clerkClient();
  const { userId } = await auth();
  if (!userId) {
    return new Error("User not found");
  }

  try {
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        languageLevel,
      },
    });

    return null;
  } catch (error) {
    console.error("Error saving language level:", error);
    return error;
  }
};
