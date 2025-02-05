import React from "react";
import { getTranslations } from 'next-intl/server';
import ProductsClient from "@/components/content/courses";
import { createClient } from "@/utils/supabase/server";
import { Courses } from "@/components/courses/Courses";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("products-title"),
        //   description: t("products-desc"),
    };
}

export default async function ProductsPage() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-gray-300 bg-background/50 p-6 text-4xl backdrop-blur-lg">
                <span>Courses</span>
            </h1>
            <div className="flex flex-col gap-10 p-6">
                <Courses />
            </div>
        </div>
    );
}
