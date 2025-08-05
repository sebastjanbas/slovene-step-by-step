/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Lottie from "lottie-react";
import teacherAnimation from "@/animations/teacher-animation.json";
import personalizedLearningAnimation from "@/animations/personalized-learning.json";
import videoCallAnimation from "@/animations/video-call.json";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { IconLogo } from "../icons/icon-logo";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const teacherA = useRef<any>(null);
  const personalizedA = useRef<any>(null);
  const videoCallA = useRef<any>(null);

  useGSAP(() => {
    gsap.from("#card1", {
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#card1-start",
        start: "bottom bottom",
        end: "top 50%",
        scrub: true,
      },
    });
    gsap.from("#card2", {
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#card2-start",
        start: "bottom bottom",
        end: "top 50%",
        scrub: true,
      },
    });
    gsap.from("#card3", {
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#card3-start",
        start: "bottom bottom",
        end: "top 50%",
        scrub: true,
      },
    });
    gsap.from("#card4", {
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#card4-start",
        start: "bottom bottom",
        end: "top 50%",
        scrub: true,
      },
    });
  });

  const t = useTranslations("homepage.features.cards");
  return (
    <>
      <div className="mt-10 flex flex-col lg:grid gap-8 sm:mt-16 lg:grid-cols-10 lg:grid-rows-5">
        <div
          id="card1"
          className="px-8 py-8 gap-8 lg:col-span-6 lg:row-span-3 flex flex-col justify-around items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"
          style={{
            background:
              "linear-gradient(300deg, rgba(42,39,69,1) 0%, rgba(139,100,95,1) 71%, rgba(233,159,119,1) 100%)",
          }}
        >
          <div className="w-full flex flex-col lg:flex-row items-center">
            <div>
              <h2
                id="card2-start"
                className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center"
              >
                {t("online-lessons.title")}
              </h2>
              <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                {t("online-lessons.description")}
              </p>
            </div>
            <Lottie
              className="hidden lg:flex"
              lottieRef={videoCallA}
              animationData={videoCallAnimation}
              loop={false}
            />
          </div>
          <div
            id="card1-start"
            className="flex flex-col lg:flex-row items-center gap-5"
          >
            <Lottie lottieRef={teacherA} animationData={teacherAnimation} />
            <div>
              <h2 className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                {t("trial-lesson.title")}
              </h2>
              <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">
                {t("trial-lesson.description")}
              </p>
            </div>
          </div>
        </div>

        <div
          id="card2"
          className="px-8 py-8 lg:col-span-4 lg:row-span-3 flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"
          style={{
            background:
              "linear-gradient(0deg, rgba(70,67,112,1) 0%, rgba(125,123,155,1) 60%, rgba(255,255,255,1) 100%)",
          }}
        >
          <h2 className="mt-2 text-lg font-medium tracking-tight text-black max-lg:text-center">
            {t("community.title")}
          </h2>
          <p className="mt-2 max-w-lg text-sm/6 text-black max-lg:text-center">
            {t("community.description")}
          </p>
          <div className="relative min-h-[20rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
            <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 dark:border-gray-800 bg-gray-900 shadow-2xl">
              <Image
                width={720}
                height={1280}
                className="size-full object-cover object-top"
                src={`/phone.png`}
                alt="phone demo"
              />
            </div>
          </div>
        </div>

        <div
          id="card3"
          className="px-8 py-8 h-96 lg:col-span-4 lg:row-span-2 flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"
          style={{
            background:
              "linear-gradient(25deg, rgba(42,39,69,1) 0%, rgba(70,67,112,1) 43%, rgba(187,170,184,1) 100%)",
          }}
        >
          <h2 className="mt-2 text-lg font-medium tracking-tight text-white text-center">
            {t("support.title")}
          </h2>
          <p className="mt-2 max-w-lg text-sm/6 text-white text-center">
            {t("support.description")}
          </p>
        </div>

        {/* <div className="hidden lg:gap-3 lg:px-8 lg:py-8 lg:col-span-2 lg:row-span-1 lg:flex flex-col justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"> */}
        <div className="hidden">
          <IconLogo className="size-10" />
          <h1 className="uppercase text-center text-[0.590rem] text-sl-accent font-bold">
            Slovene Step By Step
          </h1>
        </div>

        <div
          id="card4"
          className="px-8 py-8 col-span-6 row-span-2 flex flex-col lg:flex-row justify-center items-center shadow-lg dark:border-[1px] dark:border-gray-700 border rounded-3xl"
          style={{
            background:
              "linear-gradient(120deg, rgba(70,67,112,1) 0%, rgba(158,117,116,1) 49%, rgba(233,159,119,1) 100%)",
          }}
        >
          <div>
            <h2 className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
              {t("personalized.title")}
            </h2>
            <p
              id="card3-start"
              className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center"
            >
              {t("personalized.description")}
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
