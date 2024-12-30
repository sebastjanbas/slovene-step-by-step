import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemButton } from "../ui/ApearanceSwitchButton";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./language-swithcher";

export default function MyDialog({ mobileMenuOpen, setMobileMenuOpen, navigation, locale }) {

    const pathname = usePathname();
    const t = useTranslations('Navbar');

    return (
        <div>
            <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen && (
                    <Dialog
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                        className="lg:hidden"
                        as={motion.div} // Make the Dialog itself animated
                        static // Ensures Dialog content stays in the DOM for animations
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm px-6 py-6 shadow-lg"
                        />

                        <DialogPanel>
                            <motion.div
                                initial={{ x: "100%" }} // Start off-screen
                                animate={{ x: 0 }} // Slide into view
                                exit={{ x: "100%" }} // Slide out to the right
                                transition={{ duration: 0.8, ease: ["easeIn", "linear"], type: "spring" }}
                                // transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white dark:bg-[#121212] px-6 py-6 rounded-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <Link href={"/"} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                        <span className="sr-only">Company</span>
                                        <img
                                            alt="Company Logo"
                                            src={`/Logo.svg`}
                                            className="h-8 w-auto"
                                        />
                                    </Link>
                                    <div className="flex justify-center items-center">
                                        <LanguageSwitcher locale={locale} />
                                        <ThemButton />
                                        <button
                                            type="button"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50 dark:hover:text-indigo-300 dark:hover:bg-[#121212] ${pathname.includes(item.href) ? "text-indigo-500 dark:text-indigo-300" : "text-gray-900 dark:text-gray-200"}`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {t(item.name)}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                href={"/auth/login"}
                                                className={`-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50 dark:hover:text-indigo-300 dark:hover:bg-[#121212] ${pathname.includes("/login") ? "text-indigo-500 dark:text-indigo-300" : "text-gray-900 dark:text-gray-200"}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {t("log-in")} <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}

