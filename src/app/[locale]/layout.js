import React from "react";
import NavBar from "@/components/navbar/NavBar";
import "../global.css";
import AnimatedLayout from "@/components/ui/AnimatedLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata = {
  title: "Slovene Step By Step",
  description: "The best way to learn slovene",
  openGraph: {
    images:
      "https://generalseba.github.io/slovene-step-by-step/meta-image-link.jpg",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // const { locale } = await params;

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
      <head>
        <link
          rel="icon"
          href="https://generalseba.github.io/slovene-step-by-step/icon.svg"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <NavBar locale={locale} />
            <AnimatedLayout>
              <main className="relative isolate px-6 pt-14 lg:px-8">
                {children}
              </main>
            </AnimatedLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
