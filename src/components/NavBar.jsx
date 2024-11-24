"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MyDialog from "./navbar/Dialog";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Product", href: "/products" },
        { name: "Features", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Company", href: "/about-us" },
    ];

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                aria-label="Global"
                className="flex items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Slovene Step By Step</span>
                        <img alt="Company Logo" src="/Logo.svg" className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
                            className="text-sm/6 font-semibold text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="#" className="text-sm/6 font-semibold text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <MyDialog navigation={navigation} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </header>
    );
}
