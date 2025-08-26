"use client";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconLanguage,
  IconMapPin,
  IconStopwatch,
  IconUsers,
  IconCreditCard,
  IconLoader2,
  IconCalendar,
  IconRosetteDiscountCheck,
  IconCoinEuro,
  IconCancel,
  IconReceiptRefund,
  IconCreditCardRefund,
  IconWorld,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toZonedTime } from "date-fns-tz";
import { useTranslations } from "next-intl";
import {
  createCheckoutSession,
  bookEventDirect,
} from "@/actions/stripe-actions";
import SuccessDialog from "./success-dialog";
import { toast } from "sonner";

const LangCard = ({ locale, event }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookedEvent, setBookedEvent] = useState(null);
  const t = useTranslations("dashboard.events");

  const handleStripeBooking = async () => {
    setIsLoading(true);
    setShowBookingDialog(false);
    try {
      const result = await createCheckoutSession(event.id.toString(), locale);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to Stripe checkout
      window.location.href = result.url;
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        "Booking error: " + error.message || "Failed to book appointment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectBooking = async () => {
    setIsLoading(true);
    setShowBookingDialog(false);
    try {
      const result = await bookEventDirect(event.id.toString());

      if (result.error) {
        throw new Error(result.error);
      }

      // Show success dialog
      setBookedEvent(result.event);
      setShowSuccessDialog(true);

      toast.success("Your language club session has been booked.");
    } catch (error) {
      console.error("Direct booking error:", error);
      toast.error(
        "Booking error: " + error.message || "Failed to book appointment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card key={event.id} className="w-full max-w-sm h-fit">
        <CardHeader>
          <CardTitle>{event.theme}</CardTitle>
          <CardDescription>{event.tutor}</CardDescription>
          <CardAction>
            <div className="flex flex-col gap-1 items-end">
              <span>
                {toZonedTime(event.date, "Europe/Ljubljana").toLocaleDateString(
                  locale,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                {toZonedTime(event.date, "Europe/Ljubljana").toLocaleTimeString(
                  locale,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>{event.description}</p>
        </CardContent>
        <CardFooter className="w-full flex flex-col justify-center items-start gap-5">
          <div className="flex items-center justify-between w-full">
            <span className="text-[45px] font-medium bg-gradient-to-br bg-clip-text text-transparent from-foreground via-foreground/10 to-foreground">
              €{event.price.toFixed(2).toString().split(".")[0]}
              <span className="text-[32px] font-medium">
                {"." + event.price.toFixed(2).toString().split(".")[1]}
              </span>
            </span>
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center gap-3 w-full">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>
                      <IconLanguage /> {event.level}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t("tooltip.level", { level: event.level })}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className={
                        event.spotsLeft > 2 ? "" : "text-red-500 border-red-300"
                      }
                    >
                      <IconUsers />
                      {event.spotsLeft > 0 ? event.spotsLeft : "Full"}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    {event.spotsLeft > 0
                      ? t("tooltip.spots.spots-left", {
                          spots: event.spotsLeft,
                        })
                      : t("tooltip.spots.no-spots")}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary">
                      <IconStopwatch />
                      {event.duration}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t("tooltip.duration", { duration: event.duration })}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Badge variant="outline" className="w-full">
                <IconMapPin /> {event.location}
              </Badge>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => setShowBookingDialog(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <IconCalendar className="mr-2 h-4 w-4" />
                {t("book-now")}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Booking Options Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-4xl w-full bg-white dark:bg-background rounded-2xl flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle className="text-center">
              Choose Booking Option
            </DialogTitle>
            <DialogDescription className="text-center">
              Select how you would like to book this language club session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch w-full">
            {/* Free Direct Booking Option */}
            <Card className="border rounded-lg p-4 space-y-3 flex-1/2 h-full w-full flex flex-col items-center justify-center">
              <CardHeader className="w-full flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                  <IconRosetteDiscountCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Reserve Now, Pay at Event</CardTitle>
                <CardDescription>
                  Book instantly and pay in person when you arrive.
                  {/* <span className="block text-xs text-muted-foreground mt-1">
                    No online payment required. Payment is collected at the
                    event.
                  </span> */}
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="space-y-2 text-sm">
                  <p className="inline-flex items-center gap-2">
                    <IconRosetteDiscountCheck className="h-4 w-4" /> Online
                    Reservation
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <IconCoinEuro className="h-4 w-4" /> Payment collected at
                    event{" "}
                    <span className="text-xs text-muted-foreground italic">
                      (no refund)
                    </span>
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <IconCancel className="h-4 w-4" /> Cancelation 24 hours
                    prior to the event
                  </p>
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button
                  variant="outline"
                  onClick={handleDirectBooking}
                  className="w-full"
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  Reserve Now
                </Button>
              </CardFooter>
            </Card>
            {/* Paid Stripe Option */}
            <Card
              className="border rounded-lg p-4 space-y-3 flex-1/2 h-full w-full flex flex-col items-center justify-center relative"
              disabled
              disabledText="Online payment will be available soon."
            >
              <CardHeader className="w-full flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                  <IconCreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Pay Online</CardTitle>
                <CardDescription>Secure payment via Stripe.</CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="space-y-2 text-sm">
                  <p className="inline-flex items-center gap-2">
                    <IconWorld className="h-4 w-4" /> Secure payment processing
                    anytime anywhere
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <IconCreditCardRefund className="h-4 w-4" /> Refund
                    available{" "}
                    <span className="text-xs text-muted-foreground italic">
                      (48 hours prior to the event)
                    </span>
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <IconReceiptRefund className="h-4 w-4" /> Email confirmation
                    and receipt
                  </p>
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button
                  onClick={handleStripeBooking}
                  className="w-full"
                  disabled
                >
                  <IconCreditCard className="mr-2 h-4 w-4" />
                  Pay €{event.price.toFixed(2)}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      {showSuccessDialog && bookedEvent && (
        <SuccessDialog
          type="direct"
          event={bookedEvent}
          locale={locale}
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        />
      )}
    </>
  );
};

export default LangCard;
