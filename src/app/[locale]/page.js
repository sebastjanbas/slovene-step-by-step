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
    <main className="overflow-x-hidden">
      <Hero />
      <DetailsPageHero />
      <div className="flex py-24 sm:py-32 w-full items-center justify-center">
        <SectionTitle translations={"HomePage"} id="why-us" header={"why-us"} paragraph={"why-us-sub"}>
          <BentoGrid />
        </SectionTitle>
      </div>
      <div className="py-24 sm:py-32">
        <SectionTitle translations={"HomePage"} id="stats" header={"stats-subtitle"} paragraph={"stats-title"}>
        <Stats />
        </SectionTitle>
      </div>

      <Carousel data={reviews} stars={true} />
    </main>
  );
}
