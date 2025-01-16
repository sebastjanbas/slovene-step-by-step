import BentoGrid from "@/components/BentoGrid";
import DetailsPageHero from "@/components/content/details-page";
import Carousel from "@/components/content/testimonials";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import { getTranslations } from "next-intl/server";
import { reviews } from "@/lib/docs";
import SectionTitle from "@/components/titles/SectionTitle";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("home-title"),
    description: t("home-desc"),
  };
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <DetailsPageHero />
      <div className="flex py-24 sm:py-32 w-full items-center justify-center">
        <SectionTitle
          translations={"HomePage"}
          id="why-us"
          header={"why-us"}
          paragraph={"why-us-sub"}
        >
          <BentoGrid />
        </SectionTitle>
      </div>
      <div className="py-24 sm:py-32">
        <SectionTitle
          translations={"HomePage"}
          id="statistics"
          header={"stats-subtitle"}
          paragraph={"stats-title"}
        >
          <Stats />
        </SectionTitle>
      </div>

      <div className="text-center mb-8 lg:mb-16">
        <h2 className="text-base/7 font-semibold text-custom-accent-l dark:text-custom-accent-d">
          What members are saying.
        </h2>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-5xl">
          Testimonials
        </h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          <Carousel data={reviews} />
        </div>
      </div>
    </div>
  );
}
