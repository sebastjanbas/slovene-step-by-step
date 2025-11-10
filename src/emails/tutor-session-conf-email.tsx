import {
  Body,
  Head,
  Html,
  Preview,
  pixelBasedPreset,
  Tailwind,
} from "@react-email/components";
import type * as React from "react";
import TutorSessionConfEmailContent from "./_components/tutor-session-conf-email-content";

interface TutorSessionConfEmailProps {
  tutorName: string;
  locale: string;
  studentName: string;
  studentEmail: string;
  studentBookingCount: number;
  sessionDate: Date;
  sessionDuration: number;
  sessionType: string;
  location?: string;
  sessionNotes?: string;
}

export const TutorSessionConfEmail = ({
  tutorName,
  locale = "en",
  studentName,
  studentEmail,
  studentBookingCount,
  sessionDate,
  sessionDuration,
  sessionType,
  location,
  sessionNotes,
}: TutorSessionConfEmailProps) => {
  const translations = {
    sl: {
      preview: "Nova rezervacija - Nov učenec je rezerviral lekcijo",
    },
    en: {
      preview: "New Booking - A student has booked a session with you",
    },
    it: {
      preview: "Nuova Prenotazione - Uno studente ha prenotato una lezione",
    },
    ru: {
      preview: "Новое бронирование - Студент забронировал урок",
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
          <TutorSessionConfEmailContent
            tutorName={tutorName}
            locale={locale}
            studentName={studentName}
            studentEmail={studentEmail}
            studentBookingCount={studentBookingCount}
            sessionDate={sessionDate}
            sessionDuration={sessionDuration}
            sessionType={sessionType}
            location={location}
            sessionNotes={sessionNotes}
          />
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TutorSessionConfEmail;

// Preview props for testing
TutorSessionConfEmail.PreviewProps = {
  tutorName: "Anna Novak",
  locale: "en",
  studentName: "Sebastjan Bas",
  studentEmail: "sebastjan@example.com",
  studentBookingCount: 3,
  sessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  sessionDuration: 60,
  sessionType: "Conversational Practice",
  location: "Online - Zoom",
  sessionNotes: "Student wants to focus on pronunciation and everyday phrases.",
} satisfies TutorSessionConfEmailProps;