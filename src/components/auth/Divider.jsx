"use client";
import React from 'react'

export const Divider = () => {
    return (
        <div className='relative flex p-6 pt-0 items-center w-full'>
            <div className='flex-grow border-t border-custom-light-4 dark:border-custom-dark-4'></div>
            <span className='flex-shrink mx-4 text-custom-light-4 dark:text-custom-dark-4'>OR</span>
            <div className='flex-grow border-t border-custom-light-4 dark:border-custom-dark-4'></div>
        </div>

    )
}
