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
import Footer from "@/components/content/footer";
import Banner from "@/components/ui/Banner";

export const metadata = {
  title: "Become fluent in Slovene",
  description:
    "Slovene Step by Step personalized Slovene lessons tailored to your goals. Learn online at your convenience with experienced teachers and join a supportive community of over 1,200 members. Start today and achieve your language goals with Slovene Step by Step!",
  icons: {
    icon: "https://slovene-step-by-step.vercel.app/icon.svg",
  },
  openGraph: {
    siteName: "Slovene Step By Step",
    images: ["https://slovene-step-by-step.vercel.app/meta-image-link.jpg"],
    url: "https://slovene-step-by-step.vercel.app/",
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <NextIntlClientProvider messages={messages}>
            <div className="sticky top-0 z-50">
            <Banner />
            <NavBar locale={locale} />
            </div>
            <AnimatedLayout>
              {/* <main className="relative isolate px-6 pt-14 lg:px-8"> */}
              {/* <main className="bg-custom-gradient from-white to-emerald-400"> */}
              <main>
                {children}
              </main>
              <Footer />
            </AnimatedLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
