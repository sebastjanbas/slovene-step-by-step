import { FAQ } from "@/components/content/faq";
import { EmailComponent } from "@/components/content/info/email-component";
import PricingContent from "@/components/content/pricing-page";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PricingPage() {
  const t = useTranslations("pricing.hero");
  return (
    <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-sl-accent">
          {t("subtitle")}
        </h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-sl-primary sm:text-6xl">
          {t("title")}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-sl-secondary sm:text-xl/8">
        {t("description")}
      </p>

      <PricingContent />
      <div
        id="FAQ"
        className="mt-40 relative overflow-hidden py-16 sm:py-24 lg:py-32 mx-auto max-w-lg md:max-w-4xl px-6 lg:px-8"
      >
        <FAQ />
      </div>
      <EmailComponent />
    </section>
  );
}
