"use client";
import React from 'react'
import { usePathname } from 'next/navigation';

export const SplitScreen = ({ children }) => {
    const pathname = usePathname();
    if (pathname.includes('reset-password')) {
        return null;
    }
    return (
        <div className='hidden md:flex md:h-full w-full bg-custom-accent-l dark:bg-custom-accent-d'>
            {children}
        </div>
    )
}
