"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({ label, linkLabel, href }) => {
    return (
        <span className="flex gap-x-2 justify-center items-center w-full">
            <p>{label}</p>
            <Button size={"sm"} variant={"link"} className="font-normal text-indigo-500" asChild>
                <Link className="px-0" href={href}>{linkLabel}</Link>
            </Button>
        </span>
    );
};
