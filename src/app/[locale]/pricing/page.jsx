import PricingContent from "@/components/content/pricing-page";
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
        <div>
            <PricingContent />
        </div>
    );
}
