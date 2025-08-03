"use client";
import { useEffect } from "react";
import { toast } from "sonner";

interface BookingToastProps {
  canceled?: boolean;
}

const BookingToast = ({ canceled }: BookingToastProps) => {
  useEffect(() => {
    if (canceled) {
      toast.error("Booking cancelled", {
        description:
          "Your booking was cancelled. You can try booking again below.",
      });
    }
  }, [canceled]);

  return null; // This component doesn't render anything
};

export default BookingToast;
