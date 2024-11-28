import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MyDialog({ mobileMenuOpen, setMobileMenuOpen, navigation }) {
    const link = "https://generalseba.github.io/slovene-step-by-step";
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
                                className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white px-6 py-6 rounded-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <Link href={"/"} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                        <span className="sr-only">Company</span>
                                        <img
                                            alt="Company Logo"
                                            src={`${link}/Logo.svg`}
                                            className="h-8 w-auto"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Log in
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

