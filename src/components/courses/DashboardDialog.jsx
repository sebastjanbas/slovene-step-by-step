import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemButton } from "../ui/ApearanceSwitchButton";
import { useTranslations } from 'next-intl';
import { useAuth } from "../auth/AuthProvider";
import { UserButton } from "../auth/UserButton";

export default function DashboardDialog({ mobileMenuOpen, setMobileMenuOpen, navigation }) {

    const pathname = usePathname();
    const t = useTranslations('Navbar');
    const { user, loading } = useAuth();

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
                                transition={{ duration: 0.5, ease: ["easeIn", "easeOut"], type: "spring" }}
                                className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white dark:bg-[#121212] px-6 py-6 rounded-l-xl flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-end">
                                        <div className="flex justify-center items-center">
                                            <ThemButton />
                                            <button
                                                type="button"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="-m-2.5 rounded-md p-2.5 text-custom-light-4 dark:text-custom-dark-4"
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
                                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50 dark:hover:text-custom-accent-d dark:hover:bg-[#121212] ${pathname.endsWith(item.href) ? "text-custom-accent-l dark:text-custom-accent-d" : "text-custom-light-2 dark:text-custom-dark-2"}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <Link href={"/dashboard/settings"}>
                                        Settings
                                    </Link>
                                    <UserButton />
                                </div>
                            </motion.div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}

