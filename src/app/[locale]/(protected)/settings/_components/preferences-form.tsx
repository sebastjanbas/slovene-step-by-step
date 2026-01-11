"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconCheck, IconEdit } from "@tabler/icons-react";
import { toast } from "sonner";
import {
  getUserPreferences,
  updateUserPreferences,
  UserPreferences,
} from "@/actions/user-actions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  languageLevels,
  tutors,
  learningGoals,
  scheduleOptions,
} from "@/lib/docs";
import { useLocale } from "next-intl";
const PreferencesForm = () => {
  const { user, isLoaded } = useUser();
  const locale = useLocale();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (isLoaded && user) {
        const userPrefs = await getUserPreferences();
        if (userPrefs) {
          setPreferences(userPrefs as UserPreferences);
        }
      }
    };
    fetchPreferences();
  }, [isLoaded, user]);

  const handlePreferenceChange = (
    key: keyof UserPreferences,
    value: string | string[] | number
  ) => {
    if (!preferences) return;

    setPreferences((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleGoalToggle = (goal: string) => {
    if (!preferences) return;

    setPreferences((prev) => ({
      ...prev!,
      learningGoals: prev!.learningGoals.includes(goal)
        ? prev!.learningGoals.filter((g) => g !== goal)
        : [...prev!.learningGoals, goal],
    }));
  };

  const handleSave = async () => {
    if (!user || !preferences) return;

    setIsSubmitting(true);
    try {
      await updateUserPreferences(preferences);
      toast.success("Preferences updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTutorName = (tutorId: number) => {
    const tutor = tutors.find((t) => t.id === tutorId);
    return tutor ? tutor.name : "Unknown";
  };

  const getGoalLabels = (goalValues: string[]) => {
    return goalValues.map((value) => {
      const goal = learningGoals.find((g) => g.value === value);
      return goal ? goal.label : value;
    });
  };

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-4xl rounded-2xl p-1 bg-accent border-none">
        <CardHeader className="pt-5">
          <CardTitle>Learning Preferences</CardTitle>
        </CardHeader>
        <CardContent className="bg-white dark:bg-background border border-foreground/10 rounded-2xl p-4">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card className="w-full max-w-4xl rounded-2xl p-1 bg-accent border-none">
        <CardHeader className="pt-5">
          <CardTitle>Learning Preferences</CardTitle>
        </CardHeader>
        <CardContent className="bg-white dark:bg-background border border-foreground/10 rounded-2xl p-4">
          <p className="text-sm text-muted-foreground">
            You haven&apos;t set your learning preferences yet. Complete the
            onboarding to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl rounded-2xl p-1 bg-accent border-none">
      <CardHeader className="pt-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Learning Preferences</CardTitle>
            <CardDescription>
              Customize your learning experience and goals
            </CardDescription>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IconEdit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-white dark:bg-background border border-foreground/10 rounded-2xl p-4 space-y-6">
        {/* Language Level */}
        <div>
          <h3 className="font-semibold mb-3">Current Language Level</h3>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="font-medium">
              {languageLevels.find(
                (l) => l.value === preferences.languageLevel
              )?.label[locale] || "Not set"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Language level cannot be changed here
            </p>
          </div>
        </div>

        <Separator />

        {/* Preferred Tutor */}
        <div>
          <h3 className="font-semibold mb-3">Preferred Tutor</h3>
          {isEditing ? (
            <div className="grid gap-2">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    preferences.preferredTutor === tutor.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() =>
                    handlePreferenceChange("preferredTutor", tutor.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{tutor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tutor.description[locale]}
                      </p>
                    </div>
                    {preferences.preferredTutor === tutor.id && (
                      <IconCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg">
              <p className="font-medium">
                {getTutorName(preferences.preferredTutor)}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Learning Goals */}
        <div>
          <h3 className="font-semibold mb-3">Learning Goals</h3>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              {learningGoals.map((goal) => (
                <div
                  key={goal.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                    preferences.learningGoals.includes(goal.value)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleGoalToggle(goal.value)}
                >
                  <div className="text-2xl mb-1">{goal.icon}</div>
                  <p className="text-sm font-medium">{goal.label[locale]}</p>
                  {preferences.learningGoals.includes(goal.value) && (
                    <IconCheck className="h-4 w-4 text-primary mx-auto mt-1" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {getGoalLabels(preferences.learningGoals).map((goal, index) => (
                <Badge key={index} variant="outline">
                  {goal[locale]}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Preferred Schedule */}
        <div>
          <h3 className="font-semibold mb-3">Preferred Study Time</h3>
          {isEditing ? (
            <div className="grid gap-2">
              {scheduleOptions.map((schedule) => (
                <div
                  key={schedule.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    preferences.preferredSchedule === schedule.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() =>
                    handlePreferenceChange("preferredSchedule", schedule.value)
                  }
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{schedule.label[locale]}</p>
                    {preferences.preferredSchedule === schedule.value && (
                      <IconCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg">
              <p className="font-medium">
                {scheduleOptions.find(
                  (s) => s.value === preferences.preferredSchedule
                )?.label[locale] || "Not set"}
              </p>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreferencesForm;
