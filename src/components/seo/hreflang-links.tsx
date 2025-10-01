"use client";

import { usePathname } from "@/i18n/routing";

interface HreflangLinksProps {
  currentPath?: string;
}

export default function HreflangLinks({ currentPath }: HreflangLinksProps) {
  const pathname = usePathname();

  // Use provided path or current pathname
  const path = currentPath || pathname;

  // Generate hreflang links for all supported locales
  const locales = ["en", "sl", "ru", "it"];

  return (
    <>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`https://slovenscinakzk.com/${loc}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://slovenscinakzk.com/en${path}`}
      />
    </>
  );
}
