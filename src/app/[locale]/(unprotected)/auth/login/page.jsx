import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from 'next-intl/server';
import { redirect } from "next/navigation";


export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("log-title"),
        //   description: t("log-desc"),
    };
}

export default async function LogInPage() {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (data.user) {
        redirect('/');
    }

    return (
        <div className="flex justify-center items-center">
            <LoginForm />
        </div>
    );
}
