import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Tutor} from "@/components/calendar/types";
import {cn} from "@/lib/utils";

interface TutorAvatarsProps {
  tutors: Tutor[],
  selectedTutorId: number | null,
  onTutorSelect: (tutorId: number | null) => void,
  disabled?: boolean,
  setBooked?: (showBookedSessions: boolean) => void
}

export const TutorAvatars: React.FC<TutorAvatarsProps> = ({
                                                            tutors,
                                                            selectedTutorId,
                                                            onTutorSelect,
                                                            disabled,
                                                           setBooked
                                                          }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-end gap-2">
        {/* Show All Tutors Button */}
        <Button
          variant={"link"}
          size="sm"
          onClick={() => {onTutorSelect(null); setBooked(false);}}
          className={"p-0 text-sm flex items-end hover:no-underline cursor-pointer w-24"}
        >
            <span className={cn(
              "text-sm text-muted-foreground text-center max-w-32 truncate",
              selectedTutorId === null && !disabled && "text-indigo-500 font-semibold"
            )}>
            Show all
            </span>
          <div className={cn(
            "w-full max-w-24 translate-y-[1px] h-[2px] bg-indigo-500 absolute bottom-0 opacity-0 transition-opacity duration-300",
            selectedTutorId === null && !disabled && "opacity-100",
          )}/>
        </Button>
        {/* Individual Tutor Avatars */}
        {tutors.map((tutor) => (
          <Button
            key={tutor.id}
            size="sm"
            variant={"link"}
            onClick={() => {onTutorSelect(tutor.id); setBooked(false);}}
            className={"h-fit w-36 p-0 rounded-full flex flex-row items-end gap-2 hover:no-underline cursor-pointer"}
          >
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={tutor.avatar} alt={tutor.name}/>
              <AvatarFallback className="text-base bg-foreground/50 text-background">
                {tutor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className={cn(
              "text-sm text-muted-foreground text-center max-w-32 truncate",
              selectedTutorId === tutor.id && !disabled && "text-indigo-500 font-semibold"
            )}>
              {tutor.name.split(" ")[0]}
            </span>
            <div className={cn(
              "w-full max-w-32 translate-y-[1px] h-[2px] bg-indigo-500 absolute bottom-0 opacity-0 transition-opacity duration-300",
              selectedTutorId === tutor.id && !disabled && "opacity-100",
            )}/>
          </Button>
        ))}
      </div>
    </div>
  );
};
