"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link'

export const Disclaimer = ({ className }) => {
    return (
        <div className={cn("relative mt-40 pb-10 bottom-0 w-full", className)}>
            <div className='flex items-center justify-center px-10'>
                <p className='text-center text-sm text-custom-light-3 dark:text-custom-dark-3'>Slovene step by step uses cookies for analytics, personalized content and ads. By using Slovene step by step's services you agree to this use of cookies.
                    <Link href={"/legal/terms-of-service"} className="font-medium text-custom-light-1 dark:text-custom-dark-1 hover:underline px-2 text-nowrap">Learn more</Link>
                </p>
            </div>
        </div>
    )
}
