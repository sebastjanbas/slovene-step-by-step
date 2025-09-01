import {
  Body,
  Head,
  Html,
  Preview,
  pixelBasedPreset,
  Tailwind,
} from "@react-email/components";
import type * as React from "react";
import BookingConfEmailContent from "./_components/booking-conf-email-content";

interface BookingConfEmailProps {
  name: string;
  locale: string;
  lessonDate: string;
  lessonDuration: number;
  teacherName: string;
  lessonTheme: string;
  lessonLocation: string;
  lessonDescription: string;
  lessonLevel: string;
}

export const BookingConfEmail = ({
  name,
  locale = "en",
  lessonDate,
  lessonDuration,
  teacherName,
  lessonTheme,
  lessonDescription,
  lessonLevel,
  lessonLocation,
}: BookingConfEmailProps) => {
  const translations = {
    sl: {
      preview: "Potrditev rezervacije - Vaša lekcija slovenščine je potrjena!",
    },
    en: {
      preview: "Booking Confirmation - Your Slovene Lesson is Confirmed!",
    },
    it: {
      preview:
        "Conferma Prenotazione - La tua lezione di sloveno è confermata!",
    },
    ru: {
      preview:
        "Подтверждение бронирования - Ваш урок словенского языка подтвержден!",
    },
  };

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#e99f77",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Preview>
          {translations[locale as keyof typeof translations].preview}
        </Preview>
        <Body className="bg-offwhite font-sans text-base">
          <BookingConfEmailContent
            name={name}
            locale={locale}
            lessonDate={lessonDate}
            lessonDuration={lessonDuration}
            teacherName={teacherName}
            lessonTheme={lessonTheme}
            lessonLocation={lessonLocation}
            lessonDescription={lessonDescription}
            lessonLevel={lessonLevel}
          />
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingConfEmail;

// Preview props for testing
BookingConfEmail.PreviewProps = {
  name: "Sebastjan Bas",
  locale: "sl",
  lessonDate: "2024-12-25 at 14:00",
  lessonDuration: 60,
  teacherName: "Anna Novak",
  lessonTheme: "Culture",
  lessonLocation: "Ljubljana, Slovenia",
  lessonDescription: "Slovene culture, traditions, and customs.",
  lessonLevel: "A1",
} satisfies BookingConfEmailProps;
