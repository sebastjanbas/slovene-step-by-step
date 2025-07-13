"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const LogoutButton = ({ children, className }) => {
    const handleClick = async () => {
        const response = await logout();
        if (response.success) {
            window.location.href = "/";
        }
    };

    return (
        <Button
            onClick={handleClick}
            className={cn(
                `
                cursor-pointer
                border-[1px] 
                rounded-xl
                text-accent
                border-accent
                hover:bg-button-hover
                hover:text-white
                `,
                className
            )}
        >
            {children}
        </Button>
    );
};
