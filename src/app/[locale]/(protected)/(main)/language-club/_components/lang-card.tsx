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
  IconLanguage,
  IconMapPin,
  IconStopwatch,
  IconUsers,
  IconCreditCard,
} from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toZonedTime } from "date-fns-tz";

const LangCard = ({ locale, event }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${window.location.origin}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: event.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={event.id} className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>{event.theme}</CardTitle>
        <CardDescription>{event.tutor}</CardDescription>
        <CardAction>
          <div className="flex flex-col gap-1 items-end">
            <span>
              {new Date(event.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
                  Required knowledge: {event.level} level
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
                    ? `${event.spotsLeft} spots left`
                    : "No spots left"}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary">
                    <IconStopwatch />
                    {event.duration}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{event.duration} minutes long</TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="outline" className="w-full">
              <IconMapPin /> {event.location}
            </Badge>
          </div>
        </div>
        <Button className="w-full" onClick={handleBooking} disabled={isLoading}>
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <IconCreditCard className="mr-2 h-4 w-4" />
              Book Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LangCard;
