import {
  Img,
  Column,
  Container,
  Row,
  Section,
  Heading,
  Button,
  Text,
  Link,
} from "@react-email/components";
import React from "react";

// Simple translation function for emails
const getEmailTranslations = (locale: string) => {
  const translations = {
    sl: {
      confirmation: "Potrditev rezervacije",
      subtitle: "Vaša lekcija slovenščine je uspešno rezervirana!",
      lessonDetails: "Podrobnosti lekcije",
      date: "Datum",
      time: "Čas",
      duration: "Trajanje",
      teacher: "Tutor",
      lessonTheme: "Tip lekcije",
      addToCalendar: "Dodaj v koledar",
      googleCalendar: "Google Koledar",
      appleCalendar: "Apple Koledar",
      meetingInfo: "Informacije o sestanku",
      joinMeeting: "Pridruži se sestanku",
      dashboard: "Dashboard",
      about: "O nas",
      pricing: "Cenik",
      contact: "Kontakt",
      allRightsReserved: "Vse pravice pridržane",
      seeYouSoon: "Vidimo se kmalu",
      location: "Lokacija",
      description: "Opis",
      level: "Nivo",
    },
    en: {
      confirmation: "Booking Confirmation",
      subtitle: "Your Slovene lesson has been successfully booked!",
      lessonDetails: "Lesson Details",
      date: "Date",
      time: "Time",
      duration: "Duration",
      teacher: "Teacher",
      lessonTheme: "Lesson Type",
      addToCalendar: "Add to Calendar",
      googleCalendar: "Google Calendar",
      appleCalendar: "Apple Calendar",
      meetingInfo: "Meeting Information",
      joinMeeting: "Join Meeting",
      dashboard: "Dashboard",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      allRightsReserved: "All Rights Reserved",
      seeYouSoon: "See you soon",
      location: "Location",
      description: "Description",
      level: "Level",
    },
    it: {
      confirmation: "Conferma Prenotazione",
      subtitle: "La tua lezione di sloveno è stata prenotata con successo!",
      lessonDetails: "Dettagli Lezione",
      date: "Data",
      time: "Ora",
      duration: "Durata",
      teacher: "Insegnante",
      lessonTheme: "Tipo di Lezione",
      addToCalendar: "Aggiungi al Calendario",
      googleCalendar: "Google Calendario",
      appleCalendar: "Apple Calendario",
      meetingInfo: "Informazioni Riunione",
      joinMeeting: "Partecipa alla Riunione",
      dashboard: "Dashboard",
      about: "Chi siamo",
      pricing: "Prezzi",
      contact: "Contatto",
      allRightsReserved: "Tutti i diritti riservati",
      seeYouSoon: "A presto",
      location: "Luogo",
      description: "Descrizione",
      level: "Livello",
    },
    ru: {
      confirmation: "Подтверждение бронирования",
      subtitle: "Ваш урок словенского языка успешно забронирован!",
      lessonDetails: "Детали урока",
      date: "Дата",
      time: "Время",
      duration: "Продолжительность",
      teacher: "Учитель",
      lessonTheme: "Тип урока",
      addToCalendar: "Добавить в календарь",
      googleCalendar: "Google Календарь",
      appleCalendar: "Apple Календарь",
      meetingInfo: "Информация о встрече",
      joinMeeting: "Присоединиться к встрече",
      dashboard: "Dashboard",
      about: "О нас",
      pricing: "Цены",
      contact: "Контакты",
      allRightsReserved: "Все права защищены",
      seeYouSoon: "До скорой встречи",
      location: "Место",
      description: "Описание",
      level: "Уровень",
    },
  };

  return translations[locale as keyof typeof translations] || translations.en;
};

const BookingConfEmailContent = ({
  name,
  locale,
  lessonDate,
  lessonDuration,
  teacherName,
  lessonTheme,
  lessonLocation,
  lessonDescription,
  lessonLevel,
}: {
  name: string;
  locale: string;
  lessonDate: string;
  lessonDuration: number;
  teacherName: string;
  lessonTheme: string;
  lessonLocation: string;
  lessonDescription: string;
  lessonLevel: string;
}) => {
  const year = new Date().getFullYear();
  const t = getEmailTranslations(locale);

  // Create calendar event details
  // const eventTitle = `Slovene Lesson with ${teacherName}`;
  // const eventDescription = `${lessonTheme} lesson with ${teacherName} - ${lessonDescription} - ${lessonLevel}`;

  // Google Calendar URL
  // const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&dates=${encodeURIComponent(lessonDate.replace(/-/g, ""))}T${encodeURIComponent(lessonTime.replace(":", ""))}00Z/${encodeURIComponent(lessonDate.replace(/-/g, ""))}T${encodeURIComponent((parseInt(lessonTime.split(":")[0]) + lessonDuration).toString().padStart(2, "0") + lessonTime.split(":")[1])}00Z`;

  // Apple Calendar URL (ics file)
  // const appleCalendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${lessonDate.replace(/-/g, "")}T${lessonTime.replace(":", "")}00Z%0ADTEND:${lessonDate.replace(/-/g, "")}T${(parseInt(lessonTime.split(":")[0]) + lessonDuration).toString().padStart(2, "0") + lessonTime.split(":")[1]}00Z%0ASUMMARY:${encodeURIComponent(eventTitle)}%0ADESCRIPTION:${encodeURIComponent(eventDescription)}%0AEND:VEVENT%0AEND:VCALENDAR`;

  return (
    <>
      {/* Header with Logo */}
      <Container className="bg-white p-45">
        {/* Hero Image */}
        <Section className="my-[16px]">
          <Row>
            <Column align="center">
              <Img
                src={`https://www.slovenscinakzk.com/logo-image.png`}
                alt="Slovenščina Korak za Korakom"
                width={80}
                height={80}
              />
            </Column>
          </Row>
          <Section className="text-center mt-[16px]">
            <Text className="mt-[16px] font-semibold text-[18px] text-brand leading-[28px]">
              Slovenščina Korak za Korakom
            </Text>
            <Heading
              as="h1"
              className="font-semibold text-[36px] text-gray-900 leading-[40px] tracking-[0.4px]"
            >
              {t.confirmation}
            </Heading>
            <Text className="mt-[8px] text-[16px] text-gray-500 leading-[24px]">
              {t.subtitle}
            </Text>
          </Section>
        </Section>

        {/* Lesson Details */}
        <Section className="mt-[32px] bg-gray-50 rounded-xl p-[24px]">
          <Heading
            as="h2"
            className="text-[24px] font-semibold text-gray-900 mb-[16px]"
          >
            {t.lessonDetails}
          </Heading>

          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">
                {t.lessonTheme}:
              </Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{lessonTheme}</Text>
            </Column>
          </Row>
          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">
                {t.description}:
              </Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{lessonDescription}</Text>
            </Column>
          </Row>

          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">{t.date}:</Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{lessonDate}</Text>
            </Column>
          </Row>

          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">{t.duration}:</Text>
            </Column>
            <Column>
              <Text className="text-gray-900">
                {lessonDuration}{" "}
                {locale === "sl"
                  ? "minut"
                  : locale === "it"
                    ? "minuti"
                    : locale === "ru"
                      ? "минут"
                      : "minutes"}
              </Text>
            </Column>
          </Row>

          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">{t.teacher}:</Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{teacherName}</Text>
            </Column>
          </Row>

          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">{t.location}:</Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{lessonLocation}</Text>
            </Column>
          </Row>
          <Row className="mb-[12px]">
            <Column className="w-[120px]">
              <Text className="font-medium text-gray-700">{t.level}:</Text>
            </Column>
            <Column>
              <Text className="text-gray-900">{lessonLevel}</Text>
            </Column>
          </Row>
        </Section>

        {/* Calendar Integration */}
        <Section className="mt-[32px]">
          <Heading
            as="h3"
            className="text-[20px] font-semibold text-gray-900 mb-[16px] text-center"
          >
            {t.addToCalendar}
          </Heading>

          <Row className="text-center">
            <Column className="w-1/2 pr-[8px]">
              <Button
                className="w-full rounded-xl bg-blue-600 px-[20px] py-[12px] font-semibold text-white"
                // href={googleCalendarUrl}
              >
                {t.googleCalendar}
              </Button>
            </Column>
            <Column className="w-1/2 pl-[8px]">
              <Button
                className="w-full rounded-xl bg-gray-800 px-[20px] py-[12px] font-semibold text-white"
                // href={appleCalendarUrl}
              >
                {t.appleCalendar}
              </Button>
            </Column>
          </Row>
        </Section>

        {/* Personal Message */}
        <Section className="mt-[32px] text-center">
          <Text className="text-[18px] text-gray-700 font-medium">
            {t.seeYouSoon}, {name}!
          </Text>
        </Section>
      </Container>

      {/* Footer */}
      <Section className="mb-[40px] px-[32px] py-[40px]">
        <Row>
          <Column align="center">
            <table>
              <tr>
                <td className="px-[10px]">
                  <Link
                    className="text-slate-700 [text-decoration:none] font-medium"
                    href={`https://www.slovenscinakzk.com/${locale}/dashboard`}
                  >
                    {t.dashboard}
                  </Link>
                </td>
                <td className="px-[10px]">
                  <Link
                    className="text-slate-700 [text-decoration:none] font-medium"
                    href={`https://www.slovenscinakzk.com/${locale}/about-us`}
                  >
                    {t.about}
                  </Link>
                </td>
                <td className="px-[10px]">
                  <Link
                    className="text-slate-700 [text-decoration:none] font-medium"
                    href={`https://www.slovenscinakzk.com/${locale}/pricing`}
                  >
                    {t.pricing}
                  </Link>
                </td>
                <td className="px-[10px]">
                  <Link
                    className="text-slate-700 [text-decoration:none] font-medium"
                    href="mailto:support@slovenscinakzk.com"
                  >
                    {t.contact}
                  </Link>
                </td>
              </tr>
            </table>
          </Column>
        </Row>
        <Text className="mb-45 text-center text-gray-400">
          &copy; {year} Slovenščina Korak za Korakom, {t.allRightsReserved}
        </Text>
      </Section>
    </>
  );
};

export default BookingConfEmailContent;
