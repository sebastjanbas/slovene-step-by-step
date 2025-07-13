"use client";
import { stats } from "@/lib/docs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type StatsProps = {
  vertical?: boolean;
  size?: { text: string; space: string };
};

export default function Stats({
  vertical,
  size = {
    text: "text-3xl lg:text-4xl xl:text-5xl",
    space: "py-6 px-10  lg:py-10 lg:px-20",
  },
}: StatsProps) {
  const t = useTranslations("HomePage");
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
          once: true,
        },
        onUpdate: function () {
          this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML);
        },
      });
    });
  });

  return (
    <div className="flex justify-center items-center lg:w-full px-6 lg:px-8">
      <dl
        className={`flex ${
          vertical ? "flex-col" : "flex-col  md:flex-row"
        } gap-5 justify-center items-stretch text-center w-full`}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`bg-[#f4f4f6] max-w-[300px] xl:max-w-[500px] w-full dark:bg-[#171717] shadow-md ${size.space} rounded-2xl w-full flex flex-col gap-y-2`}
          >
            <div className="flex-grow-0 mx-[15%] md:mx-0 border-t border-[8px] -translate-y-5 border-accent/70"></div>
            <dt className="text-base/6 text-light-3 dark:text-dark-3">
              {t(stat.title)}
            </dt>
            <dd
              className={`order-first font-semibold ${size.text} tracking-tight text-light-2 dark:text-dark-3`}
            >
              <span
                ref={(el) => {
                  numbersRef.current[index] = el;
                }}
              >
                {stat.value}
              </span>
              <span> {stat.symbol}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
