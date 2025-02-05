"use client";
import Link from "next/link";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemButton } from "../ui/ApearanceSwitchButton";

import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { menuOptions } from "@/lib/docs";
import Logo from "../icons/Logo";
import { usePathname } from "@/i18n/routing";

const MenuOptions = () => {
    const pathname = usePathname();

    return (
        <nav className="dark:bg-background h-screen overflow-hidden justify-between flex items-center flex-col gap-10 py-6 px-2">
            <div className="flex items-center justify-center flex-col gap-8">
                <Link href="/" className="flex font-bold flex-row">
                    <Logo />
                </Link>
                <TooltipProvider>
                    {menuOptions.map((item) => (
                        <ul key={item.name}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <li>
                                        <Link
                                            href={item.href}
                                            className={clsx(
                                                "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-xl p-[3px] cursor-pointer ",
                                                {
                                                    "dark:bg-[#e99f77] bg-[#d88971] ":
                                                        pathname === item.href,
                                                }
                                            )}
                                        >
                                            <item.Component
                                                selected={pathname === item.href}
                                            ></item.Component>
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="bg-black/10 backdrop-blur-xl "
                                >
                                    <span>{item.name}</span>
                                </TooltipContent>
                            </Tooltip>
                        </ul>
                    ))}
                </TooltipProvider>
                <Separator />
            </div>
            <div className="flex items-center justify-center flex-col gap-8">
                <ThemButton />
            </div>
        </nav>
    );
};

export default MenuOptions;
