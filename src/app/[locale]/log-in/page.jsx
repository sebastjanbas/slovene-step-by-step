import SvgBlob from "@/components/ui/svg-blob";
import SvgBlobContainer from "@/components/ui/svg-blob-container";
import { useTranslations } from 'next-intl';
// import { routing } from "../../../i18n/routing";

// export function generateStaticParams() {
//     return routing.locales.map((locale) => ({ locale }));
// }

export default function LogInPage() {
    const t = useTranslations('Log in');

    return (
        <section>
            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
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
            <SvgBlobContainer top={false}>
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </section>
    );
}
