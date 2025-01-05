"use client";
import { cn } from '@/lib/utils';
import React from 'react'

export const BoxDecoration = ({ className }) => {
    return (
        <div className={cn("absolute", className)}>
            <div className="col-span-5 row-span-10 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>

        </div>
    );
};
