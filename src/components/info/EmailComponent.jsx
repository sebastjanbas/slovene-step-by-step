"use client";
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

export const EmailComponent = () => {
    return (
        <div className='relative overflow-hidden py-16 sm:py-24 lg:py-32 mx-auto max-w-lg md:max-w-4xl px-6 lg:px-8'>
            <h2 className="text-4xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1">Have a question?</h2>
            <p className="mt-4 text-lg text-custom-light-2 dark:text-custom-dark-2">
                Ask us a question or send us a message. We are here to help you.
            </p>
            <Button variant='mine' className='mt-8' asChild>
                <Link href='/info/contact-us'>
                    Contact us
                </Link>
            </Button>
        </div>



    )
}
