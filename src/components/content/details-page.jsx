"use client";
import { useGSAP } from "@gsap/react";
import {
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
} from "@heroicons/react/20/solid";
import gsap, { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function DetailsPageHero() {
  useGSAP(() => {
    const elements = [
      "#subtitle",
      "#title",
      "#text1",
      "#text2",
      "#point1",
      "#point2",
      "#point3",
      "#test3",
    ];
    elements.forEach((element) => {
      gsap.from(element, {
        y: "50%",
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: element,
          start: "bottom bottom",
          end: "top 50%",
          scrub: true,
        },
      });
    });
    gsap.from("#image", {
      y: "50%",
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#text1",
        start: "bottom bottom",
        end: "top 20%",
        scrub: true,
      },
    });
  });

  const t = useTranslations("HomePage");

  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-0">
      <div className="mx-auto sm:mx-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p
                id="subtitle"
                className="text-base/7 font-semibold text-custom-accent-l dark:text-custom-accent-d"
              >
                {t("why-slovene-subtitle")}
              </p>
              <h1
                id="title"
                className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-5xl"
              >
                {t("why-slovene-title")}
              </h1>
              <p
                id="text1"
                className="mt-6 text-xl/8 text-custom-light-2 dark:text-custom-dark-2"
              >
                {t("why-slovene-text1")}
              </p>
            </div>
          </div>
        </div>
        <div
          id="image"
          className="hidden lg:block -ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
        >
          <Image
            width={1280}
            height={720}
            alt="Details picture"
            src="/details-picture.png"
            className="w-full aspect-[16/11] object-cover max-w-none bg-gray-200 rounded-3xl shadow-xl sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4 lg:block sm:flex sm:justify-center">
            <div className="max-w-xl text-base/7 text-custom-light-3 dark:text-custom-dark-3 lg:max-w-lg">
              <p id="text2">{t("why-slovene-text2")}</p>
              <ul
                role="list"
                className="mt-8 space-y-8 text-custom-light-3 dark:text-custom-dark-3"
              >
                <li id="point1" className="flex gap-x-3">
                  <RocketLaunchIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-custom-accent-l dark:text-custom-accent-d"
                  />
                  <span>
                    <strong className="font-semibold text-custom-light-1 dark:text-custom-dark-1">
                      {t("why-slovene-point1-strong")}
                    </strong>{" "}
                    {t("why-slovene-point1")}
                  </span>
                </li>
                <li id="point2" className="flex gap-x-3">
                  <ChatBubbleLeftRightIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-custom-accent-l dark:text-custom-accent-d"
                  />
                  <span>
                    <strong className="font-semibold text-custom-light-1 dark:text-custom-dark-1">
                      {t("why-slovene-point2-strong")}
                    </strong>{" "}
                    {t("why-slovene-point2")}
                  </span>
                </li>
                <li id="point3" className="flex gap-x-3">
                  <BookOpenIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-custom-accent-l dark:text-custom-accent-d"
                  />
                  <span>
                    <strong className="font-semibold text-custom-light-1 dark:text-custom-dark-1">
                      {t("why-slovene-point3-strong")}
                    </strong>{" "}
                    {t("why-slovene-point3")}
                  </span>
                </li>
              </ul>
              <p id="test3" className="mt-8">
                {t("why-slovene-text3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
