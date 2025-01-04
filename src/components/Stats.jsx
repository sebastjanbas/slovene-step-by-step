"use client";
import { stats } from "@/lib/docs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Divider } from "./auth/Divider";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
    const t = useTranslations('HomePage');
    const numbersRef = useRef([]);

    useGSAP(() => {
        stats.forEach((stat, index) => {
            gsap.from(numbersRef.current[index], {
                innerHTML: 0,
                duration: 2,
                snap: { innerHTML: 1 },
                scrollTrigger: {
                    trigger: numbersRef.current[index],
                    start: "top center",
                    once: true
                },
                onUpdate: function () {
                    this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML);
                }
            });
        });
    });

    return (
        <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-3">
                {stats.map((stat, index) => (
                    <div key={stat.id} className="bg-[#f4f4f6] shadow-md mt-20 py-10 px-20 rounded-2xl mx-auto flex max-w-xs flex-col gap-y-2">
                        <div className='flex-grow border-t border-[8px] -translate-y-5 border-custom-accent-l/70'></div>
                        <dt className="text-base/7 text-custom-light-3 dark:text-custom-dark-3">{t(stat.title)}</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-custom-light-2 dark:text-custom-dark-2 sm:text-5xl">
                            <span ref={el => numbersRef.current[index] = el}>{stat.value}</span>
                            <span> {stat.symbol}</span>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}