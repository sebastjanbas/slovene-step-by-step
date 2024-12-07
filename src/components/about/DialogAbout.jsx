import { Dialog, DialogPanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SvgBlobContainer from "../ui/svg-blob-container";
import SvgBlob from "../ui/svg-blob";

export default function DialogAbout({
    memberDetailsOpen,
    setMemberDetailsOpen,
    person,
}) {
    const handleClose = () => {
        setMemberDetailsOpen(false);
    };
    return (
        <div>
            <AnimatePresence mode="wait" initial={false}>
                {memberDetailsOpen && (
                    <Dialog
                        open={memberDetailsOpen}
                        onClose={handleClose}
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
                                onClick={handleClose}
                            >
                                <motion.div
                                    initial={{ scale: "10%", opacity: 0 }} // Start off-screen
                                    animate={{ scale: "100%", opacity: 1 }} // Slide into view
                                    exit={{ scale: "10%", opacity: 0 }} // Slide out to the right
                                    transition={{
                                        duration: 0.8,
                                        ease: ["easeIn", "linear"],
                                        type: "spring",
                                    }}
                                    // className="z-50 bg-white px-6 py-6 w-96 h-96 md:w-md lg:w-xl lg:h-auto rounded-xl shadow-lg"
                                    className="z-50 bg-white dark:bg-[#121212] px-6 py-6 w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/3 xl:w-2/4 max-h-[80%] rounded-xl shadow-lg overflow-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-start justify-between">
                                        <div></div>
                                        <SvgBlobContainer top={true}>
                                            <SvgBlob color={"green"} />
                                        </SvgBlobContainer>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                    <div className="mt-3 flex flex-col">
                                        {/* <div className="pb-5 pt-0 flex justify-center items-center gap-10"> */}
                                        <div className="pb-5 pt-0 flex flex-col text-center md:text-left md:flex-row justify-center items-center gap-10">
                                            <div>
                                                <span className="sr-only">{person.name.join(" ")}</span>
                                                <img
                                                    alt="Personal Image"
                                                    src={person.imageUrl}
                                                    className="size-36 rounded-full dark:border-gray-200 dark:border-[2px]"
                                                />
                                            </div>
                                            <div className="hidden sm:block md:w-[2px] md:bg-gray-600 md:dark:bg-gray-300 md:h-40 md:mx-2"></div>
                                            <div>
                                                <h2 className="text-2xl/normal font-semibold tracking-tight text-gray-900 dark:text-gray-200 m-0">
                                                    {person.name[0]}
                                                </h2>
                                                <h1 className="text-3xl/none font-semibold tracking-tight text-gray-900 dark:text-gray-200 m-0">
                                                    {person.name[1]}
                                                </h1>
                                                <p className="text-sm/10 font-semibold text-indigo-600 dark:text-indigo-400 ">
                                                    {person.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm/6 flex justify-center gap-5 font-semibold text-gray-500 dark:text-gray-300 md:px-10 pb-6">
                                            {person.fluentIn.map((item) => (
                                                <span key={item} className="flex gap-2 items-center">
                                                    <img
                                                        src={`/checkmark.svg`}
                                                        alt="checkmark"
                                                        className="size-4"
                                                    />
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                        <table className="min-w-4/5">
                                            <tbody>
                                                <tr>
                                                    <td className="px-4 py-2 border-none text-right text-sm text-gray-600 dark:text-gray-300">
                                                        Education:
                                                    </td>
                                                    <td className="px-4 py-2 border-none text-sm text-gray-600 dark:text-gray-300">
                                                        {person.education}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border-none text-right text-sm text-gray-600 dark:text-gray-300">
                                                        Native Language:
                                                    </td>
                                                    <td className="px-4 py-2 border-none text-sm text-gray-600 dark:text-gray-300">
                                                        {person.nativeLanguage}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border-none text-right text-sm text-gray-600 dark:text-gray-300">
                                                        Experience:
                                                    </td>
                                                    <td className="px-4 py-2 border-none text-sm text-gray-600 dark:text-gray-300">
                                                        {person.languageExperience}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border-none text-right text-sm text-gray-600 dark:text-gray-300">
                                                        Tutoring:
                                                    </td>
                                                    <td className="px-4 py-2 border-none text-sm text-gray-600 dark:text-gray-300">
                                                        {person.tutoringExperience}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2 border-none text-right text-sm text-gray-600 dark:text-gray-300">
                                                        Mission:
                                                    </td>
                                                    <td className="px-4 py-2 border-none text-sm text-gray-600 dark:text-gray-300">
                                                        {person.goal}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
