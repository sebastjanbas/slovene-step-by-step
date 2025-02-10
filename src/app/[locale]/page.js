import BentoGrid from "@/components/BentoGrid";
import DetailsPageHero from "@/components/content/details-page";
import Carousel from "@/components/content/testimonials";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import { getTranslations } from "next-intl/server";
import { reviews } from "@/lib/docs";
import SectionTitle from "@/components/titles/SectionTitle";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/content/footer";

export async function generateMetadata({ params }) {
  const {locale} = await params 
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("home-title"),
    description: t("home-desc"),
  };
}

export default async function Home({params}) {
  const {locale} = await params

  return (
    <>
    <NavBar locale={locale} />
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
          <div className="flex justify-center items-center">
          <Stats />
          </div>
        </SectionTitle>
      </div>
      <SectionTitle
      translations={"HomePage"}
      id="testimonials"
      header={"testimonials-subtitle"}
      paragraph={"testimonials-title"}
      />
      <div className="w-full flex justify-center items-center">
        <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          <Carousel data={reviews} />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
