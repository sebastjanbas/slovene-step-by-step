import DetailsPageHero from "@/components/content/details-page";
import Carousel from "@/components/content/testimonials";
import Hero from "@/components/content/hero-section";
import Stats from "@/components/content/stats";
import { getTranslations } from "next-intl/server";
import { reviews } from "@/lib/docs";
import SectionTitle from "@/components/content/titles/section-title";
import BentoGridWrapper from "@/components/content/bento-grid-wrapper";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <Hero />
        <DetailsPageHero />
        <div className="flex py-24 sm:py-32 w-full items-center justify-center">
          <SectionTitle
            translations={"homepage.features"}
            id="why-us"
            header={"title"}
            paragraph={"subtitle"}
          >
            <BentoGridWrapper />
          </SectionTitle>
        </div>
        <div className="py-24 sm:py-32">
          <SectionTitle
            translations={"homepage.stats"}
            id="statistics"
            header={"subtitle"}
            paragraph={"title"}
          >
            <div className="flex justify-center items-center">
              <Stats />
            </div>
          </SectionTitle>
        </div>
        <SectionTitle
          translations={"homepage.testimonials"}
          id="testimonials"
          header={"subtitle"}
          paragraph={"title"}
        />
        <div className="w-full flex justify-center items-center">
          <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
            <Carousel data={reviews} />
          </div>
        </div>
      </div>
    </>
  );
}
