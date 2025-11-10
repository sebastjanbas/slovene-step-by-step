import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Tutor, TutoringSession } from "./types";
// import { tutors } from "./placeholder-data";
import {
  IconCalendar,
  IconMapPin,
  IconPhone,
  IconMail,
  IconEdit,
  IconCalendarEvent,
  IconX,
  IconClock,
} from "@tabler/icons-react";
import {bookSession} from "@/actions/timeblocks";
import {toast} from "sonner";
import {useRouter} from "@/i18n/routing";

type EventSheetProps = {
  isEventSheetOpen: boolean;
  setIsEventSheetOpen: (isEventSheetOpen: boolean) => void;
  selectedSession: TutoringSession | null;
  tutorsData: Tutor[];
};

export const EventSheet = (props: EventSheetProps) => {
  const router = useRouter();
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("default", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const tutor = props.tutorsData.find(
    (t) => t.id === props.selectedSession?.tutorId
  );

  const onBookSesson = async (session: TutoringSession) =>{

    const response = await bookSession(session);
    if (response.status === 200) {
      router.refresh();
      toast.success(response.message);
      props.setIsEventSheetOpen(false);
    } else {
     toast.error(response.message);
    }
  }

  return (
    <Sheet
      open={props.isEventSheetOpen}
      onOpenChange={props.setIsEventSheetOpen}
    >
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        {props.selectedSession && (
          <div className="flex flex-col h-full">
            {/* Title for accessibility */}
            <SheetTitle className="sr-only">
              {props.selectedSession.sessionType} with{" "}
              {props.selectedSession.tutorName}
            </SheetTitle>
            {/* Header Section */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {props.selectedSession.sessionType}
                    </h2>
                    <p className="text-sm text-gray-600">
                      with {props.selectedSession.tutorName}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={props.selectedSession.status as "booked" || "available" || "cancelled"}
                >
                  <span className="capitalize">
                  {props.selectedSession.status}
                  </span>
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Content Section */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Session Overview */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Session Overview
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p className="text-sm text-gray-700">
                    {props.selectedSession.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <IconClock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {props.selectedSession.duration} min
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  When
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconCalendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(new Date(props.selectedSession.startTime))}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatTime(new Date(props.selectedSession.startTime))}{" "}
                        - {formatTime(new Date(props.selectedSession.endTime))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tutor Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Your Tutor
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={tutor?.avatar} alt={tutor?.name} />
                      <AvatarFallback className="text-sm">
                        {getInitials(props.selectedSession.tutorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {props.selectedSession.tutorName}
                      </p>
                      {tutor?.bio && (
                        <p className="text-xs text-gray-600">{tutor.bio}</p>
                      )}
                    </div>
                  </div>
                  {tutor?.email && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconMail className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Email
                        </p>
                        <p className="text-sm text-gray-600">{tutor.email}</p>
                      </div>
                    </div>
                  )}
                  {tutor?.phone && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconPhone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Phone
                        </p>
                        <p className="text-sm text-gray-600">{tutor.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Session Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <IconMapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Location
                      </p>
                      <p className="text-sm text-gray-600">
                        {props.selectedSession.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="p-6">
              <div className="flex gap-3">
                {props.selectedSession.status === "available" ? (
                  <Button className="flex-1" size="sm" onClick={() => onBookSesson(props.selectedSession)}>
                    <IconCalendarEvent className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <IconEdit className="h-4 w-4 mr-2" />
                      Contact Tutor
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <IconX className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
