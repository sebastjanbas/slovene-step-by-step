"use client";
import { link } from "@/lib/docs";
import Lottie from "lottie-react";
import teacherAnimation from "@/animations/teacher-animation.json";
import supportAnimation from "@/animations/support.json";
import personalizedLearningAnimation from "@/animations/personalized-learning.json";
import videoCallAnimation from "@/animations/video-call.json";
import { useRef } from "react";
import { useTranslations } from 'next-intl';

export default function BentoGrid() {
    const teacherA = useRef();
    const supportA = useRef();
    const personalizedA = useRef();
    const videoCallA = useRef();

    const t = useTranslations('HomePage');
    return (
        <>
            <div className="mt-10 flex flex-col lg:grid gap-4 sm:mt-16 lg:grid-cols-10 lg:grid-rows-6">
                <div className="px-8 py-8 gap-8 lg:col-span-6 lg:row-span-3 flex flex-col justify-around items-center shadow-lg border rounded-3xl">
                    <div className="w-full flex flex-col lg:flex-row items-center">
                        <div>
                            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-indigo-300 max-lg:text-center">
                                {t("bento-c1-title")}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
                                {t("bento-c1-desc")}
                            </p>
                        </div>
                        <Lottie
                            className="hidden lg:flex"
                            lottieRef={videoCallA}
                            animationData={videoCallAnimation}
                            loop={false}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                        <Lottie lottieRef={teacherA} animationData={teacherAnimation} />
                        <div>
                            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-indigo-300 max-lg:text-center">
                                {t("bento-c1-title2")}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
                                {t("bento-c1-desc2")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8 lg:col-span-4 lg:row-span-4 flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-indigo-300 max-lg:text-center">
                        {t("bento-c2-title")}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
                        {t("bento-c2-desc")}
                    </p>
                    <div className="relative min-h-[20rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                        <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 dark:border-gray-800 bg-gray-900 shadow-2xl">
                            <img
                                className="size-full object-cover object-top"
                                src={`${link}/phone.png`}
                                alt="phone demo"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8 lg:col-span-4 lg:row-span-3 flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-indigo-300 max-lg:text-center">
                        {t("bento-c3-title")}
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
                        {t("bento-c3-desc")}
                    </p>

                    <Lottie
                        className="size-2/5 lg:size-3/5"
                        lottieRef={supportA}
                        animationData={supportAnimation}
                        loop={false}
                    />
                </div>

                <div className="hidden lg:gap-3 lg:px-8 lg:py-8 lg:col-span-2 lg:row-span-1 lg:flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <img
                        className="size-10"
                        src={`${link}/Logo.svg`}
                        alt="Company Logo"
                    />
                    <h1 className="uppercase text-center text-[0.590rem] text-[#5C6BC0] font-bold">
                        Slovene Step By Step
                    </h1>
                </div>

                <div className="px-8 py-8 col-span-6 row-span-2 flex flex-col lg:flex-row justify-center items-center shadow-lg border rounded-3xl">
                    <div>
                        <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-indigo-300 max-lg:text-center">
                            {t("bento-c4-title")}
                        </h2>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 max-lg:text-center">
                            {t("bento-c4-desc")}
                        </p>
                    </div>
                    <Lottie
                        className="size-7/12 lg:size-auto"
                        lottieRef={personalizedA}
                        animationData={personalizedLearningAnimation}
                        onComplete={() => {
                            personalizedA.current.playSegments([25, 75], false);
                        }}
                        loop={false}
                    />
                </div>
            </div>
        </>
    );
}
