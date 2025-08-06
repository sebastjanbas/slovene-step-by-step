"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, itIT, ruRU } from "@clerk/localizations";
import { ReactNode } from "react";
import { useLocale } from "@/contexts/locale-context";
import { slSL } from "@/clerk-localizations/slSL";

interface DynamicClerkProviderProps {
  children: ReactNode;
}

export function DynamicClerkProvider({ children }: DynamicClerkProviderProps) {
  const { locale } = useLocale();

  const clerkLocales = {
    en: enUS,
    sl: slSL,
    ru: ruRU,
    it: {
      ...itIT,
      signIn: {
        ...itIT.signIn,
        start: {
          ...itIT.signIn.start,
          titleCombined: "Continua su {{applicationName}}",
        },
      },
    },
  };

  const clerkLocalization = clerkLocales[locale] || enUS;

  return (
    <ClerkProvider localization={clerkLocalization}>{children}</ClerkProvider>
  );
}
