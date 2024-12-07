// import Link from "next/link";
import SvgBlobContainer from "@/components/ui/svg-blob-container";
import SvgBlob from "@/components/ui/svg-blob";
import { useTranslations } from 'next-intl';
import { routing } from "../i18n/routing";
import { getTranslations } from 'next-intl/server';

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
            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <img className="size-20 mb-10" src={`/Logo.svg`} alt="Company Logo" />
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">404</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-gray-200">
                        {t("title")}
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        {t("description")}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="/" className="font-semibold text-indigo-500 dark:text-indigo-400">
                            <span aria-hidden="true">&larr;</span> {t("backButton")}
                        </a>
                    </div>
                </div>
            </main>
            <SvgBlobContainer top={false}>
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </>
    );
}
