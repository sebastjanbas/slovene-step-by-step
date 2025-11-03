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
  const t = useTranslations("homepage.stats");
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
          vertical ? "flex-col" : "flex-col md:flex-row"
        } gap-6 justify-center items-stretch text-center w-full`}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`relative group bg-gradient-primary-subtle max-w-[300px] xl:max-w-[500px] w-full dark:bg-gradient-primary-subtle border border-border/50 hover:border-sl-accent/50 shadow-lg hover:shadow-xl hover:shadow-sl-accent/20 ${size.space} rounded-3xl w-full flex flex-col gap-y-3 transition-all duration-300 hover:scale-105`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <dt className="text-base/6 text-sl-secondary font-medium">
              {t(`metrics.${stat.title}`)}
            </dt>
            <dd
              className={`order-first font-bold ${size.text} tracking-tight gradient-text`}
            >
              <span
                ref={(el) => {
                  numbersRef.current[index] = el;
                }}
              >
                {stat.value}
              </span>
              <span className="text-sl-secondary"> {stat.symbol}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
