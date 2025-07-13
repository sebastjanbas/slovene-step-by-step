import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });


export const Header = ({ label, title }) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-start justify-center">
            <p className="text-accent dark:text-accent-foreground text-sm">{label}</p>
            <h1 className={cn("text-3xl font-semibold text-light-1 dark:text-dark-1", font.className)}>{title}</h1>
        </div>
    );
};
