import BentoGrid from "@/components/BentoGrid";
import DetailsPageHero from "@/components/content/details-page";
import SvgBlob from "@/components/ui/svg-blob";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("features-title"),
        // description: t("home-desc"),
    };
}

function DetailsPage() {
    const t = useTranslations('HomePage');

    return (
        <main>
            <DetailsPageHero />
            <div className="my-40">
                <h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                    {t("why-us-sub")}
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 dark:text-gray-200 sm:text-5xl">
                    {t("why-us")}
                </p>
                <BentoGrid />
            </div>
        </main>
    );
}

export default DetailsPage;
