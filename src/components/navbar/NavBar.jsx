"use client";
import { useState } from "react";
import { navigation, link } from "@/lib/docs";
import { validLinks } from "@/lib/docs";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MyDialog from "./MyDialog";
import { usePathname } from "next/navigation";
import { ThemButton } from "../ui/ApearanceSwitchButton";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const showNav = validLinks.some((link) => pathname === link.href);

    return (
        <header className={showNav ? "absolute inset-x-0 top-0 z-50" : "hidden"}>
            <nav
                aria-label="Global"
                className="flex items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Slovene Step By Step</span>
                        <img
                            alt="Company Logo"
                            src={`${link}/Logo.svg`}
                            className="h-8 w-auto"
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
                            className={`text-sm/6 font-semibold ${item.href === pathname
                                ? "text-indigo-500 dark:text-indigo-300"
                                : "text-gray-900 dark:text-white"
                                } hover:text-indigo-500 dark:hover:text-indigo-300 `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
                    <ThemButton />
                    <Link
                        href={"/log-in"}
                        className={`text-sm/6 font-semibold ${pathname === "/log-in" ? "text-indigo-500 dark:text-indigo-300" : "text-gray-900 dark:text-white"
                            } hover:text-indigo-500 dark:hover:text-indigo-300`}
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
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
