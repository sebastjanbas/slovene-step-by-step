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
import { Button } from "../ui/button";

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
                                className="fixed z-50 scale-100 gap-4 bg-[#171717] opacity-100 shadow-lg w-full border-t-2 border-[#242424] inset-x-0 bottom-0 rounded-t-xl overflow-hidden overflow-y-scroll h-[85dvh] py-2"
                            >
                                <ul className="flex flex-col gap-y-1 justify-start px-2 relative">
                                    <Button className="relative h-10 w-full flex items-center rounded hover:bg-surface-200 group/item !bg-selection shadow-sm" asChild>
                                        <Link href={"#"}>
                                            <span className="absolute left-0 top-0 flex rounded h-10 w-10 items-center justify-center text-foreground-lighter group-hover/item:text-foreground-light transition-colors">
                                                <XMarkIcon />
                                            </span>
                                            <span className="min-w-[128px] text-sm group-hover/item:text-gray-500 group-aria-current/item:text-gray-500 absolute left-10 md:left-7 md:group-data-[state=expanded]:left-12 opacity-100 md:opacity-0 md:group-data-[state=expanded]:opacity-100 text-gray-500 hover:text-foreground transition-all">Home</span>
                                        </Link>
                                    </Button>
                                </ul>
                                <ul className="flex flex-col px-2 pb-4 md:pb-0 gap-y-1">
                                    <li>

                                    </li>
                                </ul>

                            </motion.div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}

