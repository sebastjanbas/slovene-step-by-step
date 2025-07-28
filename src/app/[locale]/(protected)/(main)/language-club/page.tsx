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
import React from "react";

const exampleData = [
  {
    id: 1,
    tutor: "Ela Remic",
    date: "2025-07-31",
    theme: "Cooking",
    description:
      "We will talk about cooking, writing an recipe in slovene from start to finish.",
    level: "A1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 2,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-07-29",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
];

const LanguageClubPage = ({ params }) => {
  const { locale } = params;
  return (
    <div className="p-5 flex flex-row">
      <div className="flex-3/4">
        <h1 className="text-2xl md:text-3xl tracking-tight">
          What is a Language Club?
        </h1>
        <p></p>
      </div>
      <div className="flex-1/4">
        {exampleData.map((event) => (
          <Card key={event.id}>
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
                <Badge className="bg-light-2 text-white">
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
              <Button className="w-full cursor-pointer bg-dark-2 hover:bg-light-2 transition-colors duration-200 ease-linear rounded-xl text-white">
                Schedule
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LanguageClubPage;
