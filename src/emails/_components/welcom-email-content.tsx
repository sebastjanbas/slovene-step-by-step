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
      welcome: "Dobrodošli",
      subtitle:
        "Dobrodošli pri Slovenščini Korak za Korakom. Veseli smo, da ste izbrali nas!",
      getStarted: "Začnite zdaj!",
      dashboard: "Dashboard",
      about: "O nas",
      pricing: "Cenik",
      contact: "Kontakt",
      allRightsReserved: "Vse pravice pridržane",
    },
    en: {
      welcome: "Welcome",
      subtitle:
        "Welcome to our Slovene learning community. We're excited to have you on board!",
      getStarted: "Get Started Now!",
      dashboard: "Dashboard",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      allRightsReserved: "All Rights Reserved",
    },
    it: {
      welcome: "Benvenuto",
      subtitle:
        "Benvenuti nella nostra comunità di studio slovena. Siamo entusiasti di avervi a bordo!",
      getStarted: "Inizia!",
      dashboard: "Dashboard",
      about: "Chi siamo",
      pricing: "Prezzi",
      contact: "Contatto",
      allRightsReserved: "Tutti i diritti riservati",
    },
    ru: {
      welcome: "Добро пожаловать",
      subtitle:
        "Добро пожаловать в наше сообщество по изучению словенского языка. Мы рады видеть вас в наших рядах!",
      getStarted: "Начать сейчас!",
      dashboard: "Dashboard",
      about: "О нас",
      pricing: "Цены",
      contact: "Контакты",
      allRightsReserved: "Все права защищены",
    },
  };

  return translations[locale as keyof typeof translations] || translations.en;
};

const WelcomeEmailContent = ({
  name,
  locale,
}: {
  name: string;
  locale: string;
}) => {
  const year = new Date().getFullYear();
  const t = getEmailTranslations(locale);
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
              {t.welcome}, {name}!
            </Heading>
            <Text className="mt-[8px] text-[16px] text-gray-500 leading-[24px]">
              {t.subtitle}
            </Text>
            <Button
              className="mt-[16px] rounded-xl bg-brand px-[24px] py-[12px] font-semibold text-white"
              href={`https://www.slovenscinakzk.com/${locale}/dashboard`}
            >
              {t.getStarted}
            </Button>
          </Section>
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

export default WelcomeEmailContent;
