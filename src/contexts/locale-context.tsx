"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";

type Locale = "en" | "sl" | "ru" | "it";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({
  children,
  initialLocale = "en",
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for locale in query parameters
    const localeFromQuery = searchParams.get("locale") as Locale;
    if (localeFromQuery && ["en", "sl", "ru", "it"].includes(localeFromQuery)) {
      setLocale(localeFromQuery);
      document.documentElement.lang = localeFromQuery;
    }
  }, [searchParams]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
