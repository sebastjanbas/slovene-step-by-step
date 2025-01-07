"use client";
import { useState } from "react";
import { navigationPublic, navigationPrivate } from "@/lib/docs";
import { Link } from '@/i18n/routing';
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyDialog from "./MyDialog";
import { usePathname } from "next/navigation";
import { ThemButton } from "../ui/ApearanceSwitchButton";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./language-swithcher";
import { LogoutButton } from "@/components/auth/LogoutButton"
import { useAuth } from "../auth/AuthProvider";
import { UserButton } from "../auth/UserButton";



export default function NavBar({ locale }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Navbar');
    const { user, loading } = useAuth();

    if (pathname.includes("/auth")) {
        return null;
    }

    return (
        <header className={"relative py-1 lg:py-2 bg-white/60 dark:bg-transparent/70 lg:dark:bg-[#121212]/70 border-b-[1px] border-gray-300 dark:border-gray-500 backdrop-blur-md inset-x-0 top-0 z-50"}>
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
                            className="h-7 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-custom-light-1 dark:text-custom-dark-1"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigationPrivate.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`text-sm/6 font-semibold ${pathname.includes(item.href)
                                ? "text-custom-accent-l dark:text-custom-accent-d"
                                : "text-custom-light-2 dark:text-custom-dark-2"
                                } hover:text-custom-accent-l dark:hover:text-custom-accent-d`}
                        >
                            {t(item.name)}
                        </a>
                    ))}
                    {navigationPublic.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm/6 font-semibold ${pathname.includes(item.href)
                                ? "text-custom-accent-l dark:text-custom-accent-d"
                                : "text-custom-light-2 dark:text-custom-dark-2"
                                } hover:text-custom-accent-l dark:hover:text-custom-accent-d `}
                        >
                            {t(item.name)}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
                    <LanguageSwitcher locale={locale} />
                    <ThemButton />
                    {loading ? (
                        <span className="text-custom-light-2 dark:text-custom-dark-2">Loading...</span>
                    ) : user ? (
                        <UserButton dialog={false} />
                    ) : (
                        <Link
                            href="/auth/login"
                            className={`text-sm/6 font-semibold ${pathname.includes("/login")
                                ? "text-custom-accent-l dark:text-custom-accent-d"
                                : "text-custom-light-2 dark:text-custom-dark-2"
                                } hover:text-custom-accent-l dark:hover:text-custom-accent-d`}
                        >
                            {t("log-in")} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <MyDialog
                navigationPublic={navigationPublic}
                navigationPrivate={navigationPrivate}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                locale={locale}
            />
        </header>
    );
}
