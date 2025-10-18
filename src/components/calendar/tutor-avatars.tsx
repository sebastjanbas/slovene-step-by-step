import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/components/calendar/types";
import { cn } from "@/lib/utils";

interface TutorAvatarsProps {
  tutors: Tutor[];
  selectedTutorId: string | null;
  onTutorSelect: (tutorId: string | null) => void;
}

export const TutorAvatars: React.FC<TutorAvatarsProps> = ({
  tutors,
  selectedTutorId,
  onTutorSelect,
}) => {
  return (
    <div className="flex items-center gap-2 mr-2">
      <span className="text-sm font-medium text-muted-foreground">Tutors:</span>
      <div className="flex items-center gap-5">
        {/* Show All Tutors Button */}
        <Button
          variant={selectedTutorId === null ? "default" : "outline"}
          size="sm"
          onClick={() => onTutorSelect(null)}
          className="h-8 px-3"
        >
          All
        </Button>

        {/* Individual Tutor Avatars */}
        {tutors.map((tutor) => (
          <div key={tutor.id} className="flex flex-col items-center gap-1">
            <Button
              variant={selectedTutorId === tutor.id ? "default" : "outline"}
              size="sm"
              onClick={() => onTutorSelect(tutor.id)}
              className={cn(
                "h-14 w-14 p-0 rounded-full",
                selectedTutorId === tutor.id && "ring-2 ring-offset-2"
              )}
              style={{
                backgroundColor:
                  selectedTutorId === tutor.id ? tutor.color : undefined,
              }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback className="text-base bg-foreground/50 text-background">
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
            <span className="text-xs text-muted-foreground text-center max-w-16 truncate">
              {tutor.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
