"use client";
import { IconLogo } from "@/components/icons/icon-logo";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface WelcomeEmailProps {
  name: string;
  locale: string;
}

const baseUrl = "https://www.slovenscinakzk.com";

export const WelcomeEmail = ({ name, locale }: WelcomeEmailProps) => {
  const year = new Date().getFullYear();
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
          Welcome to Slovenščina Korak za Korakom - Start Your Slovene Learning
          Journey!
        </Preview>
        <Body className="bg-offwhite font-sans text-base h-screen">
          {/* Header with Logo */}
          <Container className="bg-white p-45">
            {/* Hero Image */}
            <Section className="my-[16px]">
              <IconLogo
                fillColor="fill-slate-700"
                className="mb-4 size-16 w-full px-auto"
              />
              <Section className="text-center">
                <Text className="mt-[16px] font-semibold text-[18px] text-brand leading-[28px]">
                  Slovenščina Korak za Korakom
                </Text>
                <Heading
                  as="h1"
                  className="font-semibold text-[36px] text-gray-900 leading-[40px] tracking-[0.4px]"
                >
                  Welcome, {name}!
                </Heading>
                <Text className="mt-[8px] text-[16px] text-gray-500 leading-[24px]">
                  Welcome to our Slovene learning community. We&apos;re excited
                  to have you on board!
                </Text>
                <Button
                  className="mt-[16px] rounded-xl bg-brand px-[24px] py-[12px] font-semibold text-white"
                  href={`${baseUrl}/${locale}/dashboard`}
                >
                  Get Started
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
                        href={`${baseUrl}/${locale}/dashboard`}
                      >
                        Dashboard
                      </Link>
                    </td>
                    <td className="px-[10px]">
                      <Link
                        className="text-slate-700 [text-decoration:none] font-medium"
                        href={`${baseUrl}/${locale}/about-us`}
                      >
                        About
                      </Link>
                    </td>
                    <td className="px-[10px]">
                      <Link
                        className="text-slate-700 [text-decoration:none] font-medium"
                        href={`${baseUrl}/${locale}/pricing`}
                      >
                        Pricing
                      </Link>
                    </td>
                    <td className="px-[10px]">
                      <Link
                        className="text-slate-700 [text-decoration:none] font-medium"
                        href="mailto:support@slovenscinakzk.com"
                      >
                        Contact
                      </Link>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
            <Text className="mb-45 text-center text-gray-400">
              &copy; {year} Slovenščina Korak za Korakom, All Rights Reserved
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  name: "John",
  locale: "sl",
} satisfies WelcomeEmailProps;

export default WelcomeEmail;
