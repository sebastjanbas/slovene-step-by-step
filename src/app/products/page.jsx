import Countdown from "@/components/ui/Countdown";
import SvgBlob from "@/components/ui/svg-blob";
import SvgBlobContainer from "@/components/ui/svg-blob-container";
import React from "react";

export default function ProductsPage() {
    return (
        <section>
            <SvgBlobContainer top={true} >
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <Countdown border={false} date={"2025-01-01"} />
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-7xl">
                        Products
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                        Products Coming!
                    </p>
                </div>
            </div>
            <SvgBlobContainer top={false} >
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </section>
    );
}
