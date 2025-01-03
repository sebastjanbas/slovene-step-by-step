"use client";
import Lottie from "lottie-react";
import teacherAnimation from "@/animations/teacher-animation.json";
import supportAnimation from "@/animations/support.json";
import personalizedLearningAnimation from "@/animations/personalized-learning.json";
import videoCallAnimation from "@/animations/video-call.json";
import { useRef } from "react";
import { useTranslations } from 'next-intl';
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);


export default function BentoGrid() {
    const teacherA = useRef();
    const supportA = useRef();
    const personalizedA = useRef();
    const videoCallA = useRef();


    useGSAP(() => {
        gsap.from("#card1", {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#card1-start",
                start: "bottom bottom",
                end: "top 50%",
                scrub: true,
            }
        })
        gsap.from("#card2", {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#card2-start",
                start: "bottom bottom",
                end: "top 50%",
                scrub: true,
            }
        })
        gsap.from("#card3", {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#card3-start",
                start: "bottom bottom",
                end: "top 50%",
                scrub: true,
            }
        })
        gsap.from("#card4", {
            opacity: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#card4-start",
                start: "bottom bottom",
                end: "top 50%",
                scrub: true,
            }
        })

    })

    const t = useTranslations('HomePage');
    return (
        <>
            <div className="mt-10 flex flex-col lg:grid gap-8 sm:mt-16 lg:grid-cols-10 lg:grid-rows-5">
                <div id="card1" className="px-8 py-8 gap-8 lg:col-span-6 lg:row-span-3 flex flex-col justify-around items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl">
                    <div className="w-full flex flex-col lg:flex-row items-center">
                        <div>
                            <h2 id="card2-start" className="mt-2 text-lg font-medium tracking-tight text-custom-light-1 dark:text-custom-dark-1 max-lg:text-center">
                                {t("bento-c1-title")}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-custom-light-3 dark:text-custom-dark-3 max-lg:text-center">
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
                    <div id="card1-start" className="flex flex-col lg:flex-row items-center gap-5">
                        <Lottie lottieRef={teacherA} animationData={teacherAnimation} />
                        <div>
                            <h2 className="mt-2 text-lg font-medium tracking-tight text-custom-light-1 dark:text-custom-dark-1 max-lg:text-center">
                                {t("bento-c1-title2")}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-custom-light-3 dark:text-custom-dark-3 max-lg:text-center">
                                {t("bento-c1-desc2")}
                            </p>
                        </div>
                    </div>
                </div>

                <div id="card2" className="px-8 py-8 lg:col-span-4 lg:row-span-3 flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl">
                    <h2 className="mt-2 text-lg font-medium tracking-tight text-custom-light-1 dark:text-custom-dark-1 max-lg:text-center">
                        {t("bento-c2-title")}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm/6 text-custom-light-3 dark:text-custom-dark-3 max-lg:text-center">
                        {t("bento-c2-desc")}
                    </p>
                    <div className="relative min-h-[20rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                        <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 dark:border-gray-800 bg-gray-900 shadow-2xl">
                            <img
                                className="size-full object-cover object-top"
                                src={`/phone.png`}
                                alt="phone demo"
                            />
                        </div>
                    </div>
                </div>

                <div id="card3" className="px-8 py-8 lg:col-span-4 lg:row-span-2 flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl">
                    <h2 className="mt-2 text-lg font-medium tracking-tight text-custom-light-1 dark:text-custom-dark-1 max-lg:text-center">
                        {t("bento-c3-title")}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm/6 text-custom-light-3 dark:text-custom-dark-3 max-lg:text-center">
                        {t("bento-c3-desc")}
                    </p>

                    <Lottie
                        className="size-2/5 lg:size-3/5"
                        lottieRef={supportA}
                        animationData={supportAnimation}
                        loop={false}
                    />
                </div>

                {/* <div className="hidden lg:gap-3 lg:px-8 lg:py-8 lg:col-span-2 lg:row-span-1 lg:flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"> */}
                <div className="hidden">
                    <img
                        className="size-10"
                        src={`/Logo.svg`}
                        alt="Company Logo"
                    />
                    <h1 className="uppercase text-center text-[0.590rem] text-custom-accent-l dark:text-custom-accent-d font-bold">
                        Slovene Step By Step
                    </h1>
                </div>

                <div id="card4" className="px-8 py-8 col-span-6 row-span-2 flex flex-col lg:flex-row justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl">
                    <div>
                        <h2 className="mt-2 text-lg font-medium tracking-tight text-custom-light-1 dark:text-custom-dark-1 max-lg:text-center">
                            {t("bento-c4-title")}
                        </h2>
                        <p id="card3-start" className="mt-2 max-w-lg text-sm/6 text-custom-light-3 dark:text-custom-dark-3 max-lg:text-center">
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
            <div id="card4-start"></div>
        </>
    );
}
