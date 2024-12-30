import React from "react";
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import ProductsClient from "@/components/content/courses";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("products-title"),
        //   description: t("products-desc"),
    };
}

export default async function ProductsPage() {

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        redirect('/auth/login')
    }

    return (
        <section>
            <h1>Welcome {data.user.email}</h1>
            <ProductsClient />
        </section>
    );
}
