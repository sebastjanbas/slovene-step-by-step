"use client";

import { Button } from "../ui/button";

export const BackButton = ({ label, linkLabel, href }) => {
    return (
        <span className="flex flex-wrap justify-center items-center w-full">
            <p className="text-custom-light-2 dark:text-custom-dark-2">{label}</p>
            <Button size={"sm"} variant={"link"} className="font-normal text-custom-accent-l dark:text-custom-accent-d" asChild>
                <a className="px-0" href={href}>{linkLabel}</a>
            </Button>
        </span>
    );
};
