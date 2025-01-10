"use client";

import { FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "./LogoutButton";
import { Button } from "../ui/button";
import { useAuth } from "./AuthProvider";

const avatarStyles = {
    avatar: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer",
    image: "aspect-square h-full w-full",
    fallback:
        "flex h-full w-full items-center justify-center rounded-full bg-custom-accent-l",
};

export const UserButton = ({ dialog, children }) => {
    const { user } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {dialog ? (
                    <span className="flex items-center gap-x-4 w-full cursor-pointer border-[1px] border-custom-accent-l rounded-xl p-2 -translate-x-2">
                        <Avatar className={avatarStyles.avatar}>
                            <AvatarImage className={avatarStyles.image} src={user.user_metadata.avatar_url} />
                            <AvatarFallback className={avatarStyles.fallback}>
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                        {children}
                    </span>
                ) : (
                    <Avatar className={avatarStyles.avatar}>
                        <AvatarImage className={avatarStyles.image} src={user.user_metadata.avatar_url} />
                        <AvatarFallback className={avatarStyles.fallback}>
                            <FaUser className="text-white" />
                        </AvatarFallback>
                    </Avatar>

                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"bg-white py-4 px-6 w-56 text-start"} align={dialog ? "start" : "end"}>
                <DropdownMenuLabel>
                    {user ? user.user_metadata.full_name : "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-custom-accent-l" />
                <DropdownMenuItem className="w-full -translate-x-2">
                    <Button variant="link" asChild>
                        <a href={"/profile"}>
                            <CgProfile className="h-5 w-5 text-custom-accent-l" />
                            Profile
                        </a>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full -translate-x-2">
                    <Button variant="link" asChild>
                        <a href={"/profile/settings"}>
                            <IoSettingsOutline className="h-5 w-5 text-custom-accent-l" />
                            Settings
                        </a>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full mt-5">
                    <LogoutButton className="text-center w-full">
                        <IoExitOutline className="h-5 w-5" />
                        Logout
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};