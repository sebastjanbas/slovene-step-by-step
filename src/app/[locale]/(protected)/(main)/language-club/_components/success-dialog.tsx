/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingSuccess from "./booking-success";

interface SuccessDialogProps {
  event: any;
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({
  event,
  locale,
  open,
  onOpenChange,
}: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-none m-0 w-fit p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Booking Successful!</DialogTitle>
        </DialogHeader>
        <BookingSuccess event={event} locale={locale} />
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
