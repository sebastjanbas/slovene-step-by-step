import BentoGrid from "@/components/BentoGrid";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import { useTranslations } from 'next-intl';
import { routing } from "../../i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main> 
      <Hero />
      <div className="flex py-24 sm:py-32 w-full items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
           {t("why-us-sub")}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 dark:text-gray-200 sm:text-5xl">
            {t("why-us")}
          </p>
          <BentoGrid />
        </div>
      </div>
      <Stats />
    </main>
  );
}
