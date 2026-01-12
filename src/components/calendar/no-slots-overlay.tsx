import React from "react";
import { Badge } from "@/components/ui/badge";
import { IconCalendarOff } from "@tabler/icons-react";

interface NoSlotsOverlayProps {
  message: string;
  submessage?: string;
}

export const NoSlotsOverlay = ({ message, submessage }: NoSlotsOverlayProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 max-w-md text-center">
        <div className="rounded-full bg-muted p-6">
          <IconCalendarOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <Badge variant="outline" className="mb-2">
            No Availability
          </Badge>
          <h3 className="text-2xl font-semibold text-foreground">
            {message}
          </h3>
          {submessage && (
            <p className="text-sm text-muted-foreground">
              {submessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
