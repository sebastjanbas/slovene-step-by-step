import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCalendar, IconExternalLink } from "@tabler/icons-react";
import { toZonedTime } from "date-fns-tz";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const NextEventCard = ({ event, locale }) => {
  const t = useTranslations("dashboard.events");
  return (
    <Card className="w-full max-w-md mx-auto min-w-sm">
      <CardHeader className="text-center text-2xl font-medium tracking-tight">
        <CardTitle>{t("next-event")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <IconCalendar className="w-4 h-4" />
            <span>
              {toZonedTime(event.date, "Europe/Ljubljana").toLocaleDateString(
                locale,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </div>
          <p className="font-medium">{event.theme}</p>
          <p className="text-sm text-muted-foreground">
            {t("event-tutor", { tutor: event.tutor })}
          </p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("event-location")}
            <span className="inline-flex items-center gap-1">
              {event.location} <IconExternalLink className="w-4 h-4" />
            </span>
          </a>
          <p>{t("event-duration", { duration: event.duration })}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {useTranslations("common.buttons")("cancel")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NextEventCard;
