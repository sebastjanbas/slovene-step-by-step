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
        <section>
            <div className="flex items-center justify-center mt-8">
                <h1 className="text-7xl font-semibold text-custom-light-1">Courses</h1>
            </div>
            <div className="overflow-x-hidden mx-14">
                <Courses />
            </div>
        </section>
    );
}
