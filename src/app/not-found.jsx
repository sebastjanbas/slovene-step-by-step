// import Link from "next/link";
import SvgBlobContainer from "@/components/ui/svg-blob-container";
import SvgBlob from "@/components/ui/svg-blob";
import { useTranslations } from 'next-intl';
import { routing } from "../i18n/routing";
import { getTranslations } from 'next-intl/server';
import Logo from "@/components/icons/Logo";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('notfound-title')
    };
}

export default function NotFoundPage() {
    const t = useTranslations('NotFoundPage');
    return (
        <>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <Logo className="size-20 mb-10" />
                <div className="text-center">
                    <p className="text-base font-semibold text-custom-accent-l dark:text-custom-accent-d">404</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-custom-light-1 sm:text-7xl dark:text-custom-dark-1">
                        {t("title")}
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-custom-light-2 dark:text-custom-dark-2 sm:text-xl/8">
                        {t("description")}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="/" className="font-semibold text-custom-accent-l dark:text-custom-accent-d hover:underline">
                            <span aria-hidden="true">&larr;</span> {t("backButton")}
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
