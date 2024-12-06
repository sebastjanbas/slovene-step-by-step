"use client";
import { useState } from "react";
import { navigation, link } from "@/lib/docs";
import { Link } from '@/i18n/routing';
// import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyDialog from "./MyDialog";
import { usePathname } from "next/navigation";
import { ThemButton } from "../ui/ApearanceSwitchButton";
import { useTranslations } from 'next-intl';

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Navbar');

    return (
        <header className={"sticky bg-white/60 dark:bg-transparent/70 lg:dark:bg-[#121212]/70 border-b-[1px] border-gray-300 dark:border-gray-500 backdrop-blur-md inset-x-0 top-0 z-50"}>
            <nav
                aria-label="Global"
                className="flex items-center justify-between px-6 py-2 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Slovene Step By Step</span>
                        <img
                            alt="Company Logo"
                            src={`/Logo.svg`}
                            className="h-6 sm:h-8 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm/6 font-semibold ${pathname.includes(item.href)
                                ? "text-indigo-500 dark:text-indigo-300"
                                : "text-gray-900 dark:text-white"
                                } hover:text-indigo-500 dark:hover:text-indigo-300 `}
                        >
                            {t(item.name)}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
                    <ThemButton />
                    <Link
                        href={"/log-in"}
                        className={`text-sm/6 font-semibold ${pathname.includes("/log-in") ? "text-indigo-500 dark:text-indigo-300" : "text-gray-900 dark:text-white"
                            } hover:text-indigo-500 dark:hover:text-indigo-300`}
                    >
                        {t("log-in")} <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <MyDialog
                navigation={navigation}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </header>
    );
}
