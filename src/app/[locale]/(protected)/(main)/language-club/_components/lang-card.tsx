import React from "react";

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
} from "@tabler/icons-react";

const LangCard = ({ locale, event }) => {
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
        <div className="flex flex-row items-center gap-3">
          <Badge>
            <IconLanguage /> {event.level}
          </Badge>
          <Badge variant="outline">
            <IconUsers />
            {event.maxApplicants}
          </Badge>
          <Badge variant="secondary">
            <IconStopwatch />
            {event.duration}
          </Badge>
          <Badge variant="outline">
            <IconMapPin /> {event.location}
          </Badge>
        </div>
        <Button className="w-full">Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default LangCard;
