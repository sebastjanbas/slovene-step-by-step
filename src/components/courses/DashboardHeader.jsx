"use client";

import { Bars3Icon, HomeIcon } from "@heroicons/react/20/solid";
import { BackArrowButton } from "../auth/BackArrowButton";
import { useState } from "react";
import Image from "next/image";
import DashboardDialog from "./DashboardDialog";
import Link from "next/link";

export const DashboardHeader = () => {

    const placeholderNavigation = [{
        name: "DASHBOARD PLACEHOLDER",
        href: "/dashboard",
    }];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="border-b-[1px] border-gray-300">
            <div className="flex flex-row justify-between items-center px-5 py-3">
                <div>
                    <Link href="/" className="flex flex-row items-center gap-x-1 hover:text-custom-light-1/70">
                        <HomeIcon className="w-4 h-4" />
                        <p>Home</p>
                    </Link>

                </div>
                <div className="flex flex-row items-center gap-x-5">
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
                </div>
            </div>
            <DashboardDialog
                navigation={placeholderNavigation}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </header>
    )
}
