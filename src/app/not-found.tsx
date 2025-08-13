import { IconLogo } from "@/components/icons/icon-logo";
import NotFound from "@/components/content/not-found";
import { LocaleProvider } from "@/contexts/locale-context";
import { DynamicClerkProvider } from "@/components/providers/dynamic-clerk-provider";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function NotFoundPage({ params }) {
  // Handle case where params might be undefined (root not-found.tsx)
  const locale = params ? (await params).locale : "en";
  const messages = await getMessages(locale || "en");
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <body>
          <Suspense>
            <LocaleProvider>
              <DynamicClerkProvider>
                <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 relative">
                  <IconLogo className="size-20 mb-10" />
                  <div className="text-center">
                    <p className="text-base font-semibold text-accent dark:text-accent-foreground">
                      404
                    </p>
                    <NotFound />
                  </div>
                </main>
              </DynamicClerkProvider>
            </LocaleProvider>
          </Suspense>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
