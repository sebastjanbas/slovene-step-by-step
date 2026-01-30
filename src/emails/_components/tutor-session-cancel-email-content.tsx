import {
  Img,
  Column,
  Container,
  Row,
  Section,
  Heading,
  Text,
  Link,
} from "@react-email/components";
import { toZonedTime } from "date-fns-tz";
import React from "react";

// Simple translation function for emails
const getEmailTranslations = (locale: string) => {
  const translations = {
    sl: {
      cancellationNotice: "Obvestilo o preklicu",
      subtitle: "Učenec je preklical lekcijo z vami",
      studentInfo: "Informacije o učencu",
      studentName: "Ime učenca",
      cancelledSession: "Preklicana lekcija",
      sessionType: "Tip lekcije",
      date: "Datum",
      duration: "Trajanje",
      location: "Lokacija",
      cancellationReason: "Razlog preklica",
      noReasonProvided: "Ni naveden razlog",
      timeSlotAvailable: "Časovna luknja je zdaj prosta",
      timeSlotText:
        "Ta časovna luknja je bila sproščena v vašem koledarju. Lahko sprejmete novo rezervacijo za ta čas.",
      actions: "Akcije",
      viewAllBookings: "Poglej vse rezervacije",
      manageCalendar: "Upravljaj koledar",
      dashboard: "Dashboard",
      about: "O nas",
      pricing: "Cenik",
      contact: "Kontakt",
      allRightsReserved: "Vse pravice pridržane",
      thankYou: "Hvala za razumevanje",
    },
    en: {
      cancellationNotice: "Cancellation Notice",
      subtitle: "A student has cancelled their session with you",
      studentInfo: "Student Information",
      studentName: "Student Name",
      cancelledSession: "Cancelled Session",
      sessionType: "Session Type",
      date: "Date",
      duration: "Duration",
      location: "Location",
      cancellationReason: "Cancellation Reason",
      noReasonProvided: "No reason provided",
      timeSlotAvailable: "Time Slot Now Available",
      timeSlotText:
        "This time slot has been freed up in your calendar. You can now accept new bookings for this time.",
      actions: "Actions",
      viewAllBookings: "View All Bookings",
      manageCalendar: "Manage Calendar",
      dashboard: "Dashboard",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      allRightsReserved: "All Rights Reserved",
      thankYou: "Thank you for understanding",
    },
    it: {
      cancellationNotice: "Avviso di Cancellazione",
      subtitle: "Uno studente ha cancellato la lezione con te",
      studentInfo: "Informazioni Studente",
      studentName: "Nome Studente",
      cancelledSession: "Sessione Cancellata",
      sessionType: "Tipo di Sessione",
      date: "Data",
      duration: "Durata",
      location: "Luogo",
      cancellationReason: "Motivo Cancellazione",
      noReasonProvided: "Nessun motivo fornito",
      timeSlotAvailable: "Fascia Oraria Ora Disponibile",
      timeSlotText:
        "Questa fascia oraria è stata liberata nel tuo calendario. Ora puoi accettare nuove prenotazioni per questo orario.",
      actions: "Azioni",
      viewAllBookings: "Vedi Tutte le Prenotazioni",
      manageCalendar: "Gestisci Calendario",
      dashboard: "Dashboard",
      about: "Chi siamo",
      pricing: "Prezzi",
      contact: "Contatto",
      allRightsReserved: "Tutti i diritti riservati",
      thankYou: "Grazie per la comprensione",
    },
    ru: {
      cancellationNotice: "Уведомление об отмене",
      subtitle: "Студент отменил урок с вами",
      studentInfo: "Информация о студенте",
      studentName: "Имя студента",
      cancelledSession: "Отмененный урок",
      sessionType: "Тип урока",
      date: "Дата",
      duration: "Продолжительность",
      location: "Место",
      cancellationReason: "Причина отмены",
      noReasonProvided: "Причина не указана",
      timeSlotAvailable: "Временной интервал теперь доступен",
      timeSlotText:
        "Этот временной интервал освободился в вашем календаре. Теперь вы можете принимать новые бронирования на это время.",
      actions: "Действия",
      viewAllBookings: "Просмотреть все бронирования",
      manageCalendar: "Управление календарем",
      dashboard: "Dashboard",
      about: "О нас",
      pricing: "Цены",
      contact: "Контакты",
      allRightsReserved: "Все права защищены",
      thankYou: "Спасибо за понимание",
    },
  };

  return translations[locale as keyof typeof translations] || translations.en;
};

const TutorSessionCancelEmailContent = ({
  tutorName,
  locale,
  studentName,
  sessionDate,
  sessionDuration,
  sessionType,
  location,
  cancellationReason,
}: {
  tutorName: string;
  locale: string;
  studentName: string;
  sessionDate: Date;
  sessionDuration: number;
  sessionType: string;
  location?: string;
  cancellationReason?: string;
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
                  color: "#EF4444",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
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
                {t.cancellationNotice}
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

          {/* Red Accent Line for Cancellation */}
          <Section
            style={{
              height: "4px",
              background: "#EF4444",
              borderRadius: "2px",
              marginBottom: "40px",
            }}
          />

          {/* Student Info Card */}
          <Section
            style={{
              backgroundColor: "#FEF2F2",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              border: "1px solid #FEE2E2",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 16px 0",
                letterSpacing: "-0.3px",
              }}
            >
              {t.studentInfo}
            </Heading>

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
          </Section>

          {/* Cancelled Session Details Card */}
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
              {t.cancelledSession}
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
                  textDecoration: "line-through",
                  opacity: 0.6,
                }}
              >
                {sessionType}
              </Text>
            </Section>

            {/* Cancellation Reason */}
            {cancellationReason && (
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
                  {t.cancellationReason}
                </Text>
                <Text
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#374151",
                    margin: "0",
                    fontStyle: "italic",
                  }}
                >
                  {cancellationReason}
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

          {/* Time Slot Available Notice */}
          {sessionType !== "Regular Session" && (

          <Section
            style={{
              backgroundColor: "#DCFCE7",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px",
              border: "1px solid #BBF7D0",
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#166534",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              ✅ {t.timeSlotAvailable}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#166534",
                margin: "0",
              }}
            >
              {t.timeSlotText}
            </Text>
          </Section>
          )}

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
              {t.thankYou}, {tutorName}
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

export default TutorSessionCancelEmailContent;
