"use client";
import { useGSAP } from '@gsap/react';
import gsap, { ScrollTrigger } from 'gsap/all';
import { useTranslations } from 'next-intl'
import React from 'react'

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ id, translations, header, paragraph, children }) => {
    const t = useTranslations(translations);
    useGSAP(() => {
        gsap.from(`#${id}`, {
            y: "40%",
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: `#${id}`,
                start: "bottom bottom",
                end: "top 25%",
                scrub: true,
            }
        })
    })

    return (
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <div id={id}>
                <h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                    {t(header)}
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 dark:text-gray-200 sm:text-5xl">
                    {t(paragraph)}
                </p>
            </div>
            {children}
        </div>
    )
}

export default SectionTitle