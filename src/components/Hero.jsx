"use client";
// import Link from "next/link";
import { Link } from '@/i18n/routing';
import SvgBlobContainer from "./ui/svg-blob-container";
import SvgBlob from "./ui/svg-blob";
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('HomePage');
    return (
        <>
            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="hidden">
                        {/* <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-200 ring-1 ring-gray-900/10 dark:ring-gray-200/25 hover:ring-gray-900/20"> */}
                        {t("announcement")}{" "}
                        <Link href="#" className="font-semibold text-indigo-500 dark:text-indigo-400">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {t("announcement-link")} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-7xl">
                        {t("title-1")}<strong className='text-indigo-500'>{t("title-strong")}</strong><br />{t("title-2")}
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        {t("under-title")}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={"/products"}
                            className="rounded-2xl bg-indigo-600 dark:bg-indigo-600/75 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-200 shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {t("action-button")}
                        </Link>
                        <Link href={"/features"} className="text-sm/6 font-semibold text-gray-900 dark:text-gray-200">
                            {t("more-info-button")} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
            <SvgBlobContainer top={false}>
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </>
    );
}
