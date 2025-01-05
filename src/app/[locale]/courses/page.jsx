import React, { use } from "react";
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
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }

    return (
        <section>
            <div className="flex items-end justify-center gap-x-4 mt-8">
                <h1 className="text-3xl">Welcome:</h1>
                <p className="text-pretty text-lg font-medium text-indigo-500 dark:text-gray-400 sm:text-xl/8">
                    {user.user_metadata.full_name}
                </p>
            </div>
            <ProductsClient />
            <div className="my-10 mx-32">
                <pre className="bg-[#121212] text-white p-10 rounded-2xl">
                    <h1 className="mb-5">{user.user_metadata.full_name}'s JSON information:</h1>
                    <code>
                        {JSON.stringify(user, null, 2)}
                    </code>
                </pre>
            </div>
        </section>
    );
}
