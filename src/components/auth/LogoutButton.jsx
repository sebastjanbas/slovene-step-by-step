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
                text-custom-accent-l
                border-custom-accent-l
                hover:bg-custom-accent-l
                hover:text-white
                `,
                className
            )}
        >
            {children}
        </Button>
    );
};
