import { Dialog, DialogPanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function DialogAbout({
    memberDetailsOpen,
    setMemberDetailsOpen,
    link,
    person,
}) {
    return (
        <div>
            <AnimatePresence mode="wait" initial={false}>
                {memberDetailsOpen && (
                    <Dialog
                        open={memberDetailsOpen}
                        onClose={setMemberDetailsOpen}
                        as={motion.div} // Make the Dialog itself animated
                        static // Ensures Dialog content stays in the DOM for animations
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm px-6 py-6 shadow-lg"
                        />

                        <DialogPanel>
                            <div
                                className="fixed inset-0 flex justify-center items-center"
                                onClick={() => setMemberDetailsOpen(false)}
                            >
                                <motion.div
                                    initial={{ scale: "10%" }} // Start off-screen
                                    animate={{ scale: "100%" }} // Slide into view
                                    exit={{ scale: "0%" }} // Slide out to the right
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    // className="z-50 bg-white px-6 py-6 w-96 h-96 md:w-md lg:w-xl lg:h-auto rounded-xl shadow-lg"
                                    className="z-50 bg-white px-6 py-6 w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/3 xl:w-2/4 max-h-[80%] rounded-xl shadow-lg overflow-auto"
                                >
                                    <div className="flex items-start justify-between">
                                        <div></div>
                                        <button
                                            type="button"
                                            onClick={() => setMemberDetailsOpen(false)}
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                    <div className="mt-3 flex flex-col">
                                        <div className="pb-5 pt-0 flex justify-center items-center gap-10">
                                            <div>
                                                {/* <span className="sr-only">{person.name.join(" ")}</span> */}
                                                <img
                                                    alt="Personal Image"
                                                    src={person.imageUrl}
                                                    className="size-36 rounded-full"
                                                />
                                            </div>
                                            <div className="w-[2px] bg-gray-600 h-40 mx-2"></div>
                                            <div>
                                                <div>
                                                    <h2 className="text-2xl/normal font-semibold tracking-tight text-gray-900 m-0">
                                                        {person.name[0]}
                                                    </h2>
                                                    <h1 className="text-3xl/none font-semibold tracking-tight text-gray-900 m-0">
                                                        {person.name[1]}
                                                    </h1>
                                                </div>
                                                <div className="text-sm/6 font-semibold text-gray-500">
                                                    <p>Speaking:</p>
                                                    {person.fluentIn.map((item) => (
                                                        <span
                                                            key={item}
                                                            className="flex gap-2 items-center pl-4"
                                                        >
                                                            <img
                                                                src={`${link}/checkmark.svg`}
                                                                alt="checkmark"
                                                                className="size-4"
                                                            />
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <ReactMarkdown className="p-10">
                                            {person.description}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}
