"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCalendar,
  IconExternalLink,
  IconLoader2,
} from "@tabler/icons-react";
import { toZonedTime } from "date-fns-tz";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import RescheduleDialog from "./reschedule-dialog";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { cancelBooking } from "@/actions/stripe-actions";

const NextEventCard = ({ event, locale }) => {
  const t = useTranslations("dashboard.events");
  const tC = useTranslations("common.buttons");
  const [isCancelling, setIsCancelling] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsCancelling(true);

    try {
      const response = await cancelBooking(event.bookingId);

      if (response.success) {
        router.refresh();
        toast.success(response.message || "Booking cancelled successfully");
      } else {
        toast.error(response.error || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReschedule = () => {
    setShowRescheduleDialog(true);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto min-w-sm">
        <CardHeader className="text-center text-2xl font-medium tracking-tight">
          <CardTitle>{t("next-event")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <IconCalendar className="w-4 h-4" />
              <span>
                {toZonedTime(event.date, "Europe/Ljubljana").toLocaleDateString(
                  locale,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>
            <p className="font-medium">{event.theme}</p>
            <p className="text-sm text-muted-foreground">
              {t("event-tutor", { tutor: event.tutor })}
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("event-location")}
              <span className="inline-flex items-center gap-1">
                {event.location} <IconExternalLink className="w-4 h-4" />
              </span>
            </a>
            <p>{t("event-duration", { duration: event.duration })}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row gap-5 items-center justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                {tC("cancel-booking")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-background border-red-500 dark:border-red-500/30 border-2 rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your booking? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tC("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    toast.promise(handleCancel, {
                      loading: "Cancelling...",
                    })
                  }
                  disabled={isCancelling}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  {isCancelling ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    tC("cancel-booking")
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={handleReschedule}
            variant="outline"
            className="flex-1"
          >
            {tC("reschedule")}
          </Button>
        </CardFooter>
      </Card>

      <RescheduleDialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
        currentEvent={event}
        bookingId={event.bookingId}
        locale={locale}
      />
    </>
  );
};

export default NextEventCard;
