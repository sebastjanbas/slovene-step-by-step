import { FAQ } from "@/components/content/FAQ";
import PricingContent from "@/components/content/pricing-page";
import { EmailComponent } from "@/components/info/EmailComponent";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        // title: t("products-title"),
        // description: t("products-desc"),
    };
}

export default function PricingPage() {
    // const t = useTranslations("HeroPage");
    return (
        <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-custom-accent-l dark:text-custom-accent-d">Pricing</h2>
                <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-6xl">
                    Choose the right plan for you
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-custom-light-2 dark:text-custom-dark-2 sm:text-xl/8">
                Find the perfect plan to master Slovene step by step. Tailored lessons, flexible options, and expert guidance to help you achieve your language goals with ease.
            </p>

            <PricingContent />
            <div id="FAQ" className='mt-40 relative overflow-hidden py-16 sm:py-24 lg:py-32 mx-auto max-w-lg md:max-w-4xl px-6 lg:px-8'>
                <h2 className="text-4xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1">Frequently asked questions</h2>
                <p className="mt-4 text-lg text-custom-light-2 dark:text-custom-dark-2">
                    Find answers to common questions about our plans and services. If you can’t find what you’re looking for, feel free to contact
                </p>
                <div className="mt-8">
                    <FAQ />
                </div>

            </div>
            <EmailComponent />
        </section>
    );
}
