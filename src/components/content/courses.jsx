'use client'

import { useTranslations } from 'next-intl'
import SvgBlobContainer from "@/components/ui/svg-blob-container"
import SvgBlob from "@/components/ui/svg-blob"
import Countdown from "@/components/ui/Countdown"

export default function ProductsClient() {
    const t = useTranslations('ProductsPage')

    return (
        <section>
            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <Countdown border={false} date={"2025-01-01"} />
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-7xl">
                        {t("title")}
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-custom-light-3 dark:text-custom-dark-3 sm:text-xl/8">
                        {t("description")}
                    </p>
                </div>
            </div>
        </section>
    )
}