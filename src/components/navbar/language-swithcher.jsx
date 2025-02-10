"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
        <div className="mx-5 relative">
            <div className="flex flex-row items-center justify-between gap-x-1 py-1 px-3 w-full text-sm text-custom-light-2 dark:text-custom-dark-3 bg-transparent border-[1px] shadow-sm border-gray-200 dark:border-gray-700 rounded-xl pointer-events-none">
                <span>{lang}</span>
                <ChevronDownIcon className="h-4 w-4 text-custom-light-2 dark:text-custom-dark-3" />
            </div>

            <label htmlFor="language-switcher" className="sr-only">Language Select</label>
            <select
                id="language-switcher"
                name="language-switcher"
                value={lang}
                onChange={handleLangChange}
                className="absolute inset-0 opacity-0 w-full cursor-pointer"
            >
                <option value="en">en</option>
                <option value="sl">sl</option>
                <option value="it">it</option>
                <option value="ru">ru</option>

            </select>
        </div>
    );
}
