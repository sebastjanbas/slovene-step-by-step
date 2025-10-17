import { headers } from "next/headers";

interface ServerHreflangLinksProps {
  currentPath?: string;
}

export default async function HreflangLinks({
  currentPath,
}: ServerHreflangLinksProps) {
  // Get current path from headers or use provided path
  const headersList = await headers();
  const pathname = currentPath || headersList.get("x-pathname") || "/";

  // Generate hreflang links for all locales
  const locales = ["en", "sl", "ru", "it"];

  return (
    <>
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`https://slovenscinakzk.com/${loc}/${pathname}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://slovenscinakzk.com/en${pathname}`}
      />
    </>
  );
}
