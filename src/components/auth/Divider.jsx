"use client";
import { useTranslations } from 'next-intl';
import React from 'react'

export const Divider = () => {
    const t = useTranslations("Log in");
    return (
        <div className='relative flex p-6 pt-0 items-center w-full'>
            <div className='flex-grow border-t border-custom-light-4 dark:border-custom-dark-4'></div>
            <span className='flex-shrink mx-4 text-custom-light-4 dark:text-custom-dark-4'>{t("or-divider")}</span>
            <div className='flex-grow border-t border-custom-light-4 dark:border-custom-dark-4'></div>
        </div>

    )
}
