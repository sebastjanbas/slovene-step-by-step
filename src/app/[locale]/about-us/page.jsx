import HelperPage from "@/components/about/HelperPage";
import { people } from "@/lib/docs";
import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("about-title"),
        description: t("about-desc"),
    };
}

export default function MeetTheTeamPage() {
    const t = useTranslations("About us");
    return (
        <section>
            {/* <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-xl mb-10">
                        <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                            Meet our Team
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600">
                            We're a dynamic group of individuals who are passionate about what
                            we do and dedicated to delivering the best results for our clients.
                        </p>
                    </div>
                    <HelperPage people={people} link={link} />
                </div>
            </div> */}
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-7xl">
                        {t("title")}
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        {t("subtitle")}
                    </p>
                </div>
            </div>
            <HelperPage people={people} />
        </section>
    );
}
