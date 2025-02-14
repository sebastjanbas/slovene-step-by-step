import React from "react";
import "../global.css";
import AnimatedLayout from "@/components/ui/AnimatedLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata = {
  title: {
    default: "Slovene Step by Step | Become fluent in Slovene",
    template: "%s | Slovene Step By Step",
  },
  description:
    "Slovene Step by Step personalized Slovene lessons tailored to your goals. Learn online at your convenience with experienced teachers and join a supportive community of over 1,200 members. Start today and achieve your language goals with Slovene Step by Step!",
  metadataBase: new URL("https://slovene-step-by-step.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://slovene-step-by-step.vercel.app/en",
      en: "https://slovene-step-by-step.vercel.app/en",
      sl: "https://slovene-step-by-step.vercel.app/sl",
      ru: "https://slovene-step-by-step.vercel.app/ru",
      it: "https://slovene-step-by-step.vercel.app/it",
    },
    openGraph: {
      type: "website",
      url: "https://slovene-step-by-step.vercel.app",
      siteName: "Slovene Step by Step | Become fluent in Slovene",
      images: [
        {
          url: "/meta-image-link.jpg",
          width: 769,
          height: 445,
          alt: "Slovene Step By Step Open Graph Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages(locale);

  // Enable static rendering
  await setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AnimatedLayout>
              <main>{children}</main>
            </AnimatedLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
