import {
  Body,
  Head,
  Html,
  Preview,
  pixelBasedPreset,
  Tailwind,
} from "@react-email/components";
import type * as React from "react";
import SessionConfEmailContent from "./_components/session-conf-email-content";

interface SessionConfEmailProps {
  name: string;
  locale: string;
  startTime: Date;
  duration: number;
  tutorName: string;
  sessionType: string;
  location: string;
}

export const SessionConfEmail = ({
  name,
  locale = "en",
  startTime,
  duration,
  tutorName,
  sessionType,
  location,
}: SessionConfEmailProps) => {
  const translations = {
    sl: {
      preview: "Potrditev seje - Osebna lekcija",
    },
    en: {
      preview: "Session Confirmation - Personal Lesson",
    },
    it: {
      preview: "Conferma Sessione - Lezione Personale",
    },
    ru: {
      preview: "Подтверждение сессии - Персональный урок",
    },
  };

  return (
    <Html>
      <Head />
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Preview>
          {translations[locale as keyof typeof translations].preview}
        </Preview>
        <Body
          className="bg-gray-50 font-sans text-base"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <SessionConfEmailContent
            name={name}
            locale={locale}
            startTime={startTime}
            duration={duration}
            tutorName={tutorName}
            sessionType={sessionType}
            location={location}
          />
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SessionConfEmail;

// Preview props for testing
SessionConfEmail.PreviewProps = {
  name: "Sebastjan Bas",
  locale: "en",
  startTime: new Date(),
  duration: 60,
  tutorName: "Anna Novak",
  sessionType: "Conversational Practice",
  location: "https://meet.google.com/abc-defg-hij",
} satisfies SessionConfEmailProps;

