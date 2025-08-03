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
          {new Date(event.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="w-full flex flex-col justify-center items-start gap-5">
        <div className="flex items-center justify-between w-full">
          <span className="text-5xl font-medium text-green-500 dark:text-green-400">
            €{event.price}
          </span>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-row items-center gap-3 w-full">
              <Badge>
                <IconLanguage /> {event.level}
              </Badge>
              <Badge variant="outline">
                <IconUsers />
                {event.maxApplicants}
              </Badge>
              <Badge variant="secondary">
                <IconStopwatch />
                {event.duration}min
              </Badge>
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
