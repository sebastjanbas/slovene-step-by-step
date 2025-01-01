"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export const LogoutButton = ({ children }) => {
    const handleClick = async () => {
        const response = await logout();
        if (response.success) {
            window.location.href = '/';
        }
    };

    return (
        <Button variant={"outline"} onClick={handleClick} className="cursor-pointer">
            {children}
        </Button>
    );
};
