import Link from "next/link";
import { link } from "@/lib/docs";
import SvgBlobContainer from "@/components/ui/svg-blob-container";
import SvgBlob from "@/components/ui/svg-blob";

export const metadata = {
    title: "Page not found!",
};

export default function NotFoundPage() {
    return (
        <>

            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <img className="size-20 mb-10" src={`${link}/Logo.svg`} alt="Company Logo" />
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">404</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-gray-200">
                        Page not found
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href={"/"} className="font-semibold text-indigo-500 dark:text-indigo-400">
                            <span aria-hidden="true">&larr;</span> Back to home
                        </Link>
                    </div>
                </div>
            </main>
            <SvgBlobContainer top={false}>
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </>
    );
}
