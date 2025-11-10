import {
  Img,
  Column,
  Container,
  Row,
  Section,
  Heading,
  Text,
  Link,
  Button,
} from "@react-email/components";
import { toZonedTime } from "date-fns-tz";
import React from "react";

// Simple translation function for emails
const getEmailTranslations = (locale: string) => {
  const translations = {
    sl: {
      newBooking: "Nova rezervacija",
      subtitle: "Nov učenec je rezerviral lekcijo z vami!",
      studentDetails: "Podrobnosti učenca",
      studentName: "Ime učenca",
      studentEmail: "E-pošta učenca",
      bookingHistory: "Zgodovina rezervacij",
      previousBookings: "Prejšnje rezervacije",
      firstBooking: "To je prva rezervacija tega učenca",
      sessionDetails: "Podrobnosti lekcije",
      sessionType: "Tip lekcije",
      date: "Datum",
      duration: "Trajanje",
      location: "Lokacija",
      notes: "Opombe",
      actions: "Akcije",
      viewAllBookings: "Poglej vse rezervacije",
      manageCalendar: "Upravljaj koledar",
      contactStudent: "Kontaktiraj učenca",
      preparationTip: "Priprava na lekcijo",
      preparationText:
        "Priporočamo, da pregledate profil učenca in se pripravite na lekcijo vsaj 15 minut pred začetkom.",
      dashboard: "Dashboard",
      about: "O nas",
      pricing: "Cenik",
      contact: "Kontakt",
      allRightsReserved: "Vse pravice pridržane",
      lookingForward: "Veselimo se vaše lekcije",
    },
    en: {
      newBooking: "New Booking",
      subtitle: "A student has booked a session with you!",
      studentDetails: "Student Details",
      studentName: "Student Name",
      studentEmail: "Student Email",
      bookingHistory: "Booking History",
      previousBookings: "Previous Bookings",
      firstBooking: "This is the student's first booking",
      sessionDetails: "Session Details",
      sessionType: "Session Type",
      date: "Date",
      duration: "Duration",
      location: "Location",
      notes: "Notes",
      actions: "Actions",
      viewAllBookings: "View All Bookings",
      manageCalendar: "Manage Calendar",
      contactStudent: "Contact Student",
      preparationTip: "Session Preparation",
      preparationText:
        "We recommend reviewing the student's profile and preparing at least 15 minutes before the session starts.",
      dashboard: "Dashboard",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      allRightsReserved: "All Rights Reserved",
      lookingForward: "Looking forward to your session",
    },
    it: {
      newBooking: "Nuova Prenotazione",
      subtitle: "Uno studente ha prenotato una lezione con te!",
      studentDetails: "Dettagli Studente",
      studentName: "Nome Studente",
      studentEmail: "Email Studente",
      bookingHistory: "Storico Prenotazioni",
      previousBookings: "Prenotazioni Precedenti",
      firstBooking: "Questa è la prima prenotazione dello studente",
      sessionDetails: "Dettagli Sessione",
      sessionType: "Tipo di Sessione",
      date: "Data",
      duration: "Durata",
      location: "Luogo",
      notes: "Note",
      actions: "Azioni",
      viewAllBookings: "Vedi Tutte le Prenotazioni",
      manageCalendar: "Gestisci Calendario",
      contactStudent: "Contatta Studente",
      preparationTip: "Preparazione Sessione",
      preparationText:
        "Consigliamo di rivedere il profilo dello studente e prepararsi almeno 15 minuti prima dell'inizio della sessione.",
      dashboard: "Dashboard",
      about: "Chi siamo",
      pricing: "Prezzi",
      contact: "Contatto",
      allRightsReserved: "Tutti i diritti riservati",
      lookingForward: "Non vediamo l'ora della tua sessione",
    },
    ru: {
      newBooking: "Новое бронирование",
      subtitle: "Студент забронировал урок с вами!",
      studentDetails: "Детали студента",
      studentName: "Имя студента",
      studentEmail: "Email студента",
      bookingHistory: "История бронирований",
      previousBookings: "Предыдущие бронирования",
      firstBooking: "Это первое бронирование студента",
      sessionDetails: "Детали урока",
      sessionType: "Тип урока",
      date: "Дата",
      duration: "Продолжительность",
      location: "Место",
      notes: "Заметки",
      actions: "Действия",
      viewAllBookings: "Просмотреть все бронирования",
      manageCalendar: "Управление календарем",
      contactStudent: "Связаться со студентом",
      preparationTip: "Подготовка к уроку",
      preparationText:
        "Рекомендуем ознакомиться с профилем студента и подготовиться как минимум за 15 минут до начала урока.",
      dashboard: "Dashboard",
      about: "О нас",
      pricing: "Цены",
      contact: "Контакты",
      allRightsReserved: "Все права защищены",
      lookingForward: "С нетерпением ждем вашего урока",
    },
  };

  return translations[locale as keyof typeof translations] || translations.en;
};

const TutorSessionConfEmailContent = ({
  tutorName,
  locale,
  studentName,
  studentEmail,
  studentBookingCount,
  sessionDate,
  sessionDuration,
  sessionType,
  location,
  sessionNotes,
}: {
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
}) => {
  const year = new Date().getFullYear();
  const t = getEmailTranslations(locale);

  // Format date for display
  const formattedDate = toZonedTime(
    sessionDate,
    "Europe/Ljubljana",
  ).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Main Container with max-width for modern look */}
      <Container
        className="max-w-[600px] mx-auto"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        {/* Spacer for top padding */}
        <Section style={{ paddingTop: "40px" }} />

        {/* Main Content Card */}
        <Container
          className="bg-white rounded-[20px]"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            margin: "0 auto",
            padding: "48px 40px",
          }}
        >
          {/* Header with Logo */}
          <Section style={{ marginBottom: "32px" }}>
            <Row>
              <Column align="center">
                <Img
                  src={`https://www.slovenscinakzk.com/logo-image.png`}
                  alt="Slovenščina Korak za Korakom"
                  width={64}
                  height={64}
                  style={{ borderRadius: "16px" }}
                />
              </Column>
            </Row>
            <Section className="text-center" style={{ marginTop: "24px" }}>
              <Text
                className="font-semibold"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#A855F7",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  background:
                    "linear-gradient(135deg, #6089CB 0%, #A855F7 50%, #F9A8D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Slovenščina Korak za Korakom
              </Text>
              <Heading
                as="h1"
                style={{
                  fontSize: "32px",
                  lineHeight: "40px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.5px",
                }}
              >
                {t.newBooking}
              </Heading>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#6B7280",
                  margin: "0",
                }}
              >
                {t.subtitle}
              </Text>
            </Section>
          </Section>

          {/* Purple-Blue-Pink Gradient Accent Line */}
          <Section
            style={{
              height: "4px",
              background:
                "linear-gradient(90deg, #6089CB 0%, #A855F7 50%, #F9A8D4 100%)",
              borderRadius: "2px",
              marginBottom: "40px",
            }}
          />

          {/* Student Details Card */}
          <Section
            style={{
              backgroundColor: "#EFF6FF",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "24px",
              border: "1px solid #DBEAFE",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 24px 0",
                letterSpacing: "-0.3px",
              }}
            >
              {t.studentDetails}
            </Heading>

            {/* Student Info Grid */}
            <Section>
              <Row style={{ marginBottom: "16px" }}>
                <Column style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#6B7280",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {t.studentName}
                  </Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#111827",
                      fontWeight: "600",
                      margin: "0",
                    }}
                  >
                    {studentName}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: "16px" }}>
                <Column style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#6B7280",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {t.studentEmail}
                  </Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Link
                    href={`mailto:${studentEmail}`}
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#2563EB",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}
                  >
                    {studentEmail}
                  </Link>
                </Column>
              </Row>

              <Row>
                <Column style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#6B7280",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {t.bookingHistory}
                  </Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#111827",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {studentBookingCount === 0 ? (
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#FEF3C7",
                          color: "#92400E",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "13px",
                        }}
                      >
                        {t.firstBooking}
                      </span>
                    ) : (
                      `${studentBookingCount} ${t.previousBookings}`
                    )}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Session Details Card */}
          <Section
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "32px",
              border: "1px solid #F3F4F6",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 24px 0",
                letterSpacing: "-0.3px",
              }}
            >
              {t.sessionDetails}
            </Heading>

            {/* Session Type - Highlighted */}
            <Section style={{ marginBottom: "20px" }}>
              <Text
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#6B7280",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                {t.sessionType}
              </Text>
              <Text
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#111827",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {sessionType}
              </Text>
            </Section>

            {/* Session Notes */}
            {sessionNotes && (
              <Section
                style={{
                  marginBottom: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#6B7280",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  {t.notes}
                </Text>
                <Text
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#374151",
                    margin: "0",
                  }}
                >
                  {sessionNotes}
                </Text>
              </Section>
            )}

            {/* Details Grid */}
            <Section>
              <Row style={{ marginBottom: "16px" }}>
                <Column style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#6B7280",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {t.date}
                  </Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#111827",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {formattedDate}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: "16px" }}>
                <Column style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#6B7280",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {t.duration}
                  </Text>
                </Column>
                <Column style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "#111827",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {sessionDuration}{" "}
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

              {location && (
                <Row>
                  <Column style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontSize: "13px",
                        lineHeight: "20px",
                        color: "#6B7280",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      {t.location}
                    </Text>
                  </Column>
                  <Column style={{ width: "60%" }}>
                    <Text
                      style={{
                        fontSize: "15px",
                        lineHeight: "24px",
                        color: "#111827",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      {location}
                    </Text>
                  </Column>
                </Row>
              )}
            </Section>
          </Section>

          {/* Action Buttons */}
          <Section style={{ marginBottom: "32px" }}>
            <Heading
              as="h3"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 16px 0",
              }}
            >
              {t.actions}
            </Heading>
            <Row>
              <Column align="center">
                <Button
                  href={`https://www.slovenscinakzk.com/${locale}/dashboard`}
                  style={{
                    backgroundColor: "#A855F7",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    display: "inline-block",
                    marginBottom: "12px",
                  }}
                >
                  {t.viewAllBookings}
                </Button>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Button
                  href={`https://www.slovenscinakzk.com/${locale}/calendar`}
                  style={{
                    backgroundColor: "#6089CB",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    display: "inline-block",
                  }}
                >
                  {t.manageCalendar}
                </Button>
              </Column>
            </Row>
          </Section>

          {/* Preparation Tip */}
          <Section
            style={{
              backgroundColor: "#FEF3C7",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px",
              border: "1px solid #FDE68A",
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#92400E",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              💡 {t.preparationTip}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#92400E",
                margin: "0",
              }}
            >
              {t.preparationText}
            </Text>
          </Section>

          {/* Personal Message */}
          <Section
            style={{
              textAlign: "center",
              marginTop: "40px",
              paddingTop: "32px",
              borderTop: "1px solid #F3F4F6",
            }}
          >
            <Text
              style={{
                fontSize: "17px",
                lineHeight: "28px",
                color: "#374151",
                fontWeight: "500",
                margin: "0",
              }}
            >
              {t.lookingForward}, {tutorName}!
            </Text>
          </Section>
        </Container>

        {/* Footer */}
        <Section style={{ padding: "40px 32px", textAlign: "center" }}>
          <Row>
            <Column align="center">
              <table style={{ margin: "0 auto" }}>
                <tr>
                  <td style={{ padding: "0 12px" }}>
                    <Link
                      href={`https://www.slovenscinakzk.com/${locale}/dashboard`}
                      style={{
                        color: "#6B7280",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {t.dashboard}
                    </Link>
                  </td>
                  <td style={{ padding: "0 12px" }}>
                    <Link
                      href={`https://www.slovenscinakzk.com/${locale}/about-us`}
                      style={{
                        color: "#6B7280",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {t.about}
                    </Link>
                  </td>
                  <td style={{ padding: "0 12px" }}>
                    <Link
                      href={`https://www.slovenscinakzk.com/${locale}/pricing`}
                      style={{
                        color: "#6B7280",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {t.pricing}
                    </Link>
                  </td>
                  <td style={{ padding: "0 12px" }}>
                    <Link
                      href="mailto:support@slovenscinakzk.com"
                      style={{
                        color: "#6B7280",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {t.contact}
                    </Link>
                  </td>
                </tr>
              </table>
            </Column>
          </Row>
          <Text
            style={{
              marginTop: "24px",
              fontSize: "13px",
              lineHeight: "20px",
              color: "#9CA3AF",
              marginBottom: "0",
            }}
          >
            &copy; {year} Slovenščina Korak za Korakom, {t.allRightsReserved}
          </Text>
        </Section>

        {/* Bottom Spacer */}
        <Section style={{ paddingBottom: "40px" }} />
      </Container>
    </>
  );
};

export default TutorSessionConfEmailContent;