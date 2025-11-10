import {
  Body,
  Head,
  Html,
  Preview,
  pixelBasedPreset,
  Tailwind,
} from "@react-email/components";
import type * as React from "react";
import TutorSessionCancelEmailContent from "./_components/tutor-session-cancel-email-content";

interface TutorSessionCancelEmailProps {
  tutorName: string;
  locale: string;
  studentName: string;
  sessionDate: Date;
  sessionDuration: number;
  sessionType: string;
  location?: string;
  cancellationReason?: string;
}

export const TutorSessionCancelEmail = ({
  tutorName,
  locale = "en",
  studentName,
  sessionDate,
  sessionDuration,
  sessionType,
  location,
  cancellationReason,
}: TutorSessionCancelEmailProps) => {
  const translations = {
    sl: {
      preview: "Odpoved rezervacije - Učenec je preklical lekcijo",
    },
    en: {
      preview: "Booking Cancelled - A student has cancelled their session",
    },
    it: {
      preview: "Prenotazione Cancellata - Uno studente ha cancellato la lezione",
    },
    ru: {
      preview: "Бронирование отменено - Студент отменил урок",
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
          <TutorSessionCancelEmailContent
            tutorName={tutorName}
            locale={locale}
            studentName={studentName}
            sessionDate={sessionDate}
            sessionDuration={sessionDuration}
            sessionType={sessionType}
            location={location}
            cancellationReason={cancellationReason}
          />
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TutorSessionCancelEmail;

// Preview props for testing
TutorSessionCancelEmail.PreviewProps = {
  tutorName: "Anna Novak",
  locale: "en",
  studentName: "Sebastjan Bas",
  sessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  sessionDuration: 60,
  sessionType: "Conversational Practice",
  location: "Online - Zoom",
  cancellationReason: "Personal emergency - need to reschedule",
} satisfies TutorSessionCancelEmailProps;