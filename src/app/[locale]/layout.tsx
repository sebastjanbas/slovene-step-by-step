import React from "react";
import "../globals.css";
import AnimatedLayout from "@/components/ui/AnimatedLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <body>
          <Toaster richColors position="top-center" />
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AnimatedLayout>
                <AuthProvider>
                  <main>{children}</main>
                </AuthProvider>
              </AnimatedLayout>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
