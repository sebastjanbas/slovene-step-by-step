"use client"
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useAuth } from "../auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { menuOptions } from "@/lib/docs";

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
                                initial={{ y: "100%" }} // Start off-screen
                                animate={{ y: 0 }} // Slide into view
                                exit={{ y: "100%" }} // Slide out to the right
                                transition={{ duration: 0.3, ease: ["easeInOut", "easeOut"], type: "" }}
                                className="fixed z-50 scale-100 gap-4 bg-white dark:bg-[#171717] opacity-100 shadow-lg w-full border-t-2 border-white/20 dark:border-[#242424] inset-x-0 bottom-0 rounded-t-xl overflow-hidden h-[85dvh] py-2"
                            >
                                <div className="flex flex-row gap-y-1 justify-between px-2 relative">
                                    <div></div>
                                    <div>
                                        <Button variant="link" onClick={() => setMobileMenuOpen(false)} className="relative h-10 w-full flex items-center rounded hover:bg-surface-200 group/item !bg-selection shadow-sm">
                                            <span className="flex rounded h-10 w-10 items-center justify-center text-foreground-lighter group-hover/item:text-foreground-light transition-colors">
                                                <XMarkIcon />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                    <ul className="flex flex-col px-7 pb-4 md:pb-0 gap-y-2">
                                        {menuOptions.map((link) => (
                                            <li className="w-full" key={link.name}>
                                                <Link href={link.href}>
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/" className="px-7 mb-16">
                                        Back Home
                                    </Link>
                                </div>

                            </motion.div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}

