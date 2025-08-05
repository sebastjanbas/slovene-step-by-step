// import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link, routing } from "../i18n/routing";
import { getTranslations } from "next-intl/server";
import { IconLogo } from "@/components/icons/icon-logo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata.not-found" });

  return {
    title: t("title"),
  };
}

export default function NotFoundPage() {
  const t = useTranslations("errors.not-found");
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <IconLogo className="size-20 mb-10" />
          <div className="text-center">
            <p className="text-base font-semibold text-accent dark:text-accent-foreground">
              404
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-sl-primary sm:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-sl-secondary sm:text-xl/8">
              {t("description")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="font-semibold text-sl-accent hover:underline"
              >
                <span aria-hidden="true">&larr;</span> {t("button")}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
