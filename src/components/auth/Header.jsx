import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });


export const Header = ({ label, title }) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-start justify-center">
            <p className="text-custom-accent-l dark:text-custom-accent-d text-sm">{label}</p>
            <h1 className={cn("text-3xl font-semibold text-custom-light-1 dark:text-custom-dark-1", font.className)}>{title}</h1>
        </div>
    );
};
