"use client";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type SectionTitleProps = {
  id?: string;
  translations?: string;
  header: string;
  paragraph: string;
  textOrientation?: string;
  children?: React.ReactNode;
};

const SectionTitle = ({
  id,
  translations,
  header,
  paragraph,
  children,
  textOrientation = "text-center",
}: SectionTitleProps) => {
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
      },
    });
  });

  return (
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <div id={id} className="w-full mb-10 mt-40">
        <h2
          className={cn(
            "text-base/7 font-semibold text-sl-accent",
            textOrientation
          )}
        >
          {translations ? t(header) : header}
        </h2>
        <p
          className={cn(
            "mt-2 text-balance text-4xl font-semibold tracking-tight text-sl-primary sm:text-5xl",
            textOrientation
          )}
        >
          {translations ? t(paragraph) : paragraph}
        </p>
      </div>
      {children}
    </div>
  );
};

export default SectionTitle;
