"use client"
import { Book, Headphones, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "../auth/UserButton";
import DashboardDialog from "../courses/DashboardDialog";
import { menuOptions } from "@/lib/docs";
import { Bars3Icon } from "@heroicons/react/24/outline";

const InfoBar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-row justify-end gap-6 items-center px-0 sm:px-4 py-4 w-full dark:bg-background">
            <span className="hidden sm:flex items-center bg-muted px-4 rounded-full">
                <Search />
                <Input
                    placeholder="Quick Search"
                    className="border-none bg-transparent"
                />
            </span>

            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <UserButton />
            <div className="flex sm:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-custom-light-1 dark:text-custom-dark-1"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
            </div>
            <DashboardDialog
                navigation={menuOptions}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </div>
    );
};

export default InfoBar;
