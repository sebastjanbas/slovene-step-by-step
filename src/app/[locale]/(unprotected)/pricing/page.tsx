import { FAQ } from "@/components/content/faq";
import PricingContent from "@/components/content/pricing-page";
import { EmailComponent } from "@/components/info/email-component";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("pricing-title"),
        description: t("pricing-desc"),
    };
}

export default function PricingPage() {
    const t = useTranslations("Pricing");
    return (
        <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-accent dark:text-accent-foreground">{t("subtitle")}</h2>
                <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-light-1 dark:text-dark-1 sm:text-6xl">
                    {t("title")}
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-light-2 dark:text-dark-2 sm:text-xl/8">
                {t("text")}
            </p>

            <PricingContent />
            <div id="FAQ" className='mt-40 relative overflow-hidden py-16 sm:py-24 lg:py-32 mx-auto max-w-lg md:max-w-4xl px-6 lg:px-8'>
                <h2 className="text-4xl font-semibold tracking-tight text-light-1 dark:text-dark-1">{t("sec2-title")}</h2>
                <p className="mt-4 text-lg text-light-2 dark:text-dark-2">
                    {t("sec2-subtitle")}
                </p>
                <div className="mt-8">
                    <FAQ />
                </div>

            </div>
            <EmailComponent title={t("sec3-title")} subtitle={t("sec3-subtitle")} buttontext={t("sec3-button")} />
        </section>
    );
}
