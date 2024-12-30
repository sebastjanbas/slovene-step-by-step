"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({ label, href }) => {
    return (
        <Button size={"sm"} variant={"link"} className="font-normal w-full" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    );
};
