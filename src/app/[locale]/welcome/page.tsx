"use client";

import React, {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {IconCheck, IconCircleDashedCheck, IconInfoCircle, IconLoader2, IconUser,} from "@tabler/icons-react";
import {redirect} from "@/i18n/routing";
import {useLocale, useTranslations} from "next-intl";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {updateUserPreferences, UserPreferences} from "@/actions/user-actions";
import {toast} from "sonner";
import {languageLevels, learningGoals, scheduleOptions, tutors,} from "@/lib/docs";

const WelcomePage = () => {
  const {user, isLoaded} = useUser();
  const locale = useLocale();
  const t = useTranslations("welcome");
  const t1 = useTranslations("common.buttons");
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    languageLevel: "",
    preferredTutor: 0,
    learningGoals: [],
    preferredSchedule: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  // Helpers (place near the top of your component)
  const activeIndex = Math.max(
    0,
    languageLevels.findIndex(l => l.value === preferences.languageLevel)
  );
  const pct =
    languageLevels.length > 1
      ? (activeIndex / (languageLevels.length - 1)) * 100
      : 0;

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user has already completed onboarding
      const hasCompletedOnboarding = user.unsafeMetadata?.onboardingCompleted;
      if (hasCompletedOnboarding) {
        redirect({href: "/dashboard", locale: locale});
      }
    }
  }, [isLoaded, user, locale]);

  const handlePreferenceChange = (
    key: keyof UserPreferences,
    value: string | string[] | number
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setPreferences((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter((g) => g !== goal)
        : [...prev.learningGoals, goal],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return preferences.languageLevel !== "";
      case 2:
        return preferences.preferredTutor !== 0;
      case 3:
        return preferences.learningGoals.length > 0;
      case 4:
        return preferences.preferredSchedule !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      await updateUserPreferences(preferences);
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingCompleted: true,
          welcome: false,
        },
      });
      redirect({href: "/dashboard", locale: locale});
    } catch (error) {
      toast.error("Error saving preferences: " + error);
    }
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{t("par1.title")}</h2>
              <p className="text-muted-foreground">{t("par1.description")}</p>
            </div>

            {/* ===== Mobile: Vertical timeline ===== */}
            <div className="md:hidden relative mx-auto w-full max-w-xl">
              {/* Base vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-[2px] bg-muted rounded-full"
                aria-hidden
              />
              {/* Progress fill */}
              <div
                className="absolute left-5 top-0 w-[2px] bg-primary rounded-full transition-[height] duration-500"
                style={{height: `${pct}%`}}
                aria-hidden
              />

              <ol className="space-y-6 pt-1">
                {languageLevels.map((level, idx) => {
                  const isActive = preferences.languageLevel === level.value;
                  const isCompleted = idx <= activeIndex;

                  return (
                    <li key={level.value} className="relative pl-12">
                      {/* Node */}
                      <button
                        type="button"
                        onClick={() =>
                          handlePreferenceChange("languageLevel", level.value)
                        }
                        className={[
                          "absolute left-[1.25rem] top-0 -translate-x-1/2 grid place-items-center",
                          "h-9 w-9 rounded-full shadow-sm outline-none transition-all",
                          "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-primary text-primary-foreground ring-2 ring-primary"
                            : isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-accent",
                        ].join(" ")}
                        aria-pressed={isActive}
                        aria-current={isActive ? "step" : undefined}
                        title={level.label[locale]}
                      >
                <span className="text-[10px] font-bold leading-none">
                  {level.value}
                </span>
                      </button>

                      {/* Content card */}
                      <div
                        className={[
                          "rounded-xl border p-3 pr-4 transition-all",
                          isActive ? "border-primary ring-1 ring-primary/30" : "border-border",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3">
                          {/*<div className="text-3xl leading-none">{level.icon}</div>*/}
                          <div className="flex-1">
                            <h3 className="font-semibold">{level.label[locale]}</h3>
                            <p className="text-sm text-muted-foreground">
                              {level.description[locale]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* ===== Desktop/Tablet: Horizontal timeline ===== */}
            <div className="hidden md:block">
              <div className="relative mx-auto w-full max-w-[850px] pt-10">
                {/* Base horizontal line */}
                <div className="absolute -bottom-5 h-[2px] bg-muted rounded-full w-full"
                     aria-hidden/>
                {/* Progress fill */}
                <div
                  className="absolute -bottom-5 mx-auto h-[2px] bg-primary rounded-full transition-[width] duration-500"
                  style={{width: `${pct}%`}}
                  aria-hidden
                />

              </div>
              <div className="relative mx-auto w-full max-w-5xl pb-2">
                <ol className="relative z-10 flex items-start justify-between">
                  {languageLevels.map((level, idx) => {
                    const isActive = preferences.languageLevel === level.value;
                    const isCompleted = idx <= activeIndex;

                    return (
                      <li key={level.value} className="flex flex-col items-center w-full">
                        {/* Node */}
                        <button
                          type="button"
                          onClick={() =>
                            handlePreferenceChange("languageLevel", level.value)
                          }
                          className={[
                            "relative grid place-items-center h-10 w-10 rounded-full transition-all outline-none cursor-pointer",
                            "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                              ? "bg-primary text-primary-foreground shadow ring-2 ring-primary"
                              : isCompleted
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-accent",
                          ].join(" ")}
                          aria-pressed={isActive}
                          aria-current={isActive ? "step" : undefined}
                          title={level.label[locale]}
                        >
                  <span className="text-[10px] font-bold">
                    {level.value}
                  </span>
                          {isActive && (
                            <span className="absolute -z-10 h-14 w-14 rounded-full bg-primary/20 blur-sm"/>
                          )}
                        </button>

                        {/* Label & description */}
                        <div className="mt-3 w-[9rem] text-center select-none">
                          <p className="text-sm font-semibold leading-tight">
                            {level.label[locale]}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground leading-snug line-clamp-2">
                            {level.description[locale]}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        );


      case 2:
        return (
          <div className="space-y-1">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold">{t("par2.title")}</h2>
              <p className="text-muted-foreground">{t("par2.description")}</p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:flex flex-row gap-4 justify-center items-center">
              {tutors.map((tutor) => (
                <Card
                  key={tutor.id}
                  className={`cursor-pointer transition-all shadow-none border-1 border-transparent hover:shadow-md hover:border-foreground/15 w-full max-w-auto rounded-2xl p-4 items-center gap-4 ${
                    preferences.preferredTutor === tutor.id
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() =>
                    handlePreferenceChange("preferredTutor", tutor.id)
                  }
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={tutor.avatar}/>
                        <AvatarFallback>
                          <IconUser className="h-10 w-10 text-foreground/40"/>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex flex-col justify-center items-center gap-2">
                        <h3 className="font-semibold text-xl">{tutor.name}</h3>
                        <ul
                          className="text-base text-center text-muted-foreground flex flex-col gap-1 justify-center items-center">
                          {tutor.description[locale].split(",").map((item) => (
                            <li
                              className="inline-flex items-center gap-2"
                              key={item}
                            >
                              <IconCircleDashedCheck className="h-4 w-4 text-primary"/>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {preferences.preferredTutor === tutor.id && (
                        <IconCheck className="h-5 w-5 text-primary"/>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-center inline-flex justify-center items-center gap-2 w-full mt-2">
              <IconInfoCircle className="h-4 w-4 text-primary"/>
              {t("par2.info-message")}
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{t("par3.title")}</h2>
              <p className="text-muted-foreground">{t("par3.description")}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {learningGoals.map((goal) => (
                <Card
                  key={goal.value}
                  className={`cursor-pointer transition-all border-1 border-transparent hover:border-foreground/15 shadow-none hover:shadow-md ${
                    preferences.learningGoals.includes(goal.value)
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleGoalToggle(goal.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-4">{goal.icon}</div>
                    <h3 className="font-semibold text-base">
                      {goal.label[locale]}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {goal.description[locale]}
                    </p>
                    {preferences.learningGoals.includes(goal.value) && (
                      <IconCheck className="h-4 w-4 text-primary mx-auto mt-2"/>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{t("par4.title")}</h2>
              <p className="text-muted-foreground">{t("par4.description")}</p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:flex flex-row gap-4 justify-center items-center w-full">
              {scheduleOptions.map((schedule) => (
                <Card
                  key={schedule.value}
                  className={`cursor-pointer transition-all shadow-none border-1 border-transparent hover:shadow-md hover:border-foreground/15 w-full ${
                    preferences.preferredSchedule === schedule.value
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() =>
                    handlePreferenceChange("preferredSchedule", schedule.value)
                  }
                >
                  <CardContent className="px-8 py-4">
                    <div className="flex flex-col gap-4 items-center justify-center">
                      <h3 className="font-semibold text-4xl">
                        {schedule.icon}
                      </h3>
                      <h3 className="font-semibold">
                        {schedule.label[locale]}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {schedule.value === "flexible"
                          ? schedule.time[locale]
                          : schedule.time}
                      </p>
                      {preferences.preferredSchedule === schedule.value && (
                        <IconCheck className="h-5 w-5 text-primary"/>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center min-h-screen w-full h-full  bg-gradient-to-br from-indigo-300/40 via-background to-sl-accent/40 dark:from-indigo-300/30 dark:to-sl-accent/30 ">
        <div className="text-center space-y-4">
          <IconLoader2 className="h-8 w-8 animate-spin mx-auto"/>
          <p>{t1("loading")}</p>
        </div>
      </div>
    );
  }

  if (user?.unsafeMetadata?.onboardingCompleted) {
    redirect({href: "/dashboard", locale: locale});
    return null;
  }

  return (
    <div
      className="w-full h-full min-h-screen py-20 m-0 px-4 bg-gradient-to-br from-indigo-300/40 via-background to-sl-accent/40 dark:from-indigo-300/30 dark:to-sl-accent/30 overflow-hidden">
      <div className="h-full w-full overflow-y-scroll">
        {/* Header */}
        <div className="text-center mb-8 mt-10">
          <h1 className="text-center text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {t("title")} <br/>
            <span className="font-semibold text-4xl">
              Slovenščina Korak za Korakom!
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("progress.steps", {
                step: currentStep,
                total: totalSteps,
              })}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("progress.complete", {
                percentage: (((currentStep - 1) / totalSteps) * 100).toFixed(0),
              })}
            </span>
          </div>
          <Progress
            value={((currentStep - 1) / totalSteps) * 100}
            className="h-1"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              {t("navigation.back")}
            </Button>

            <div className="flex space-x-4">
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  {t("navigation.next")}
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed() || isSubmitting}
                >
                  {isSubmitting
                    ? t("navigation.completing")
                    : t("navigation.complete")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
