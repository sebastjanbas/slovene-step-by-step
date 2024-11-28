"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function AnimatedLayout({ children }) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div
                key={pathname} // Use the current pathname for animations
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: ["easeIn", "easeOut"], type: "spring", bounce: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
