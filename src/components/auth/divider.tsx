"use client";
import { useTranslations } from 'next-intl';
import React from 'react'

export const Divider = () => {
    const t = useTranslations("Log in");
    return (
        <div className='relative flex p-6 pt-0 items-center w-full'>
            <div className='flex-grow border-t border-light-4 dark:border-dark-4'></div>
            <span className='flex-shrink mx-4 text-light-4 dark:text-dark-4'>{t("or-divider")}</span>
            <div className='flex-grow border-t border-light-4 dark:border-dark-4'></div>
        </div>

    )
}
