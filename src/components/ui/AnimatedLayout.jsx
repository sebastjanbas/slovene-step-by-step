"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function AnimatedLayout({ children }) {
    const pathname = usePathname();

    return (
        <motion.div
            className="bg-white"
            key={pathname}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.5,
                ease: ["easeIn", "easeOut"],
                type: "spring",
                bounce: 0.5,
            }}
        >
            {children}
        </motion.div>
    );
}
