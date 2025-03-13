"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export const PasswordInput = ({ isPending, field }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex h-10 w-full rounded-[6px] border border-gray-400 dark:border-gray-800 bg-background text-base">
            <input
                className="flex w-full bg-background m-1 px-2 py-2 outline-none"
                {...field}
                disabled={isPending}
                placeholder="*****"
                type={showPassword ? "text" : "password"}
            />
            <button
                type="button"
                className={`${!field.value ? "hidden" : "inline-flex"} items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10`}
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeIcon className="h-6 w-6" />
                ) : (
                    <EyeSlashIcon className="h-6 w-6" />
                )}
            </button>
        </div>
    )
}
