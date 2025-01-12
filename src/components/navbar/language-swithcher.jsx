"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";

export default function LanguageSwitcher({ locale }) {
    const [lang, setLang] = useState(locale);
    const router = useRouter();
    const pathname = usePathname();

    const handleLangChange = (event) => {
        const newLang = event.target.value;
        setLang(newLang);
        router.replace(pathname, { locale: newLang });
    };

    return (
        <div className="mx-5">
            <select value={lang} onChange={handleLangChange} className="outline-none bg-transparent text-custom-light-3 dark:text-custom-dark-3" name="language-switcher">
                <option value="en">en</option>
                <option value="sl">sl</option>
                <option value="ru">ru</option>
            </select>
        </div>
    );
}
