"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations("HomePage");
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const chars = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline();
    const title = titleRef.current;

    const fullText = `${t("title-1")} ${t("title-strong")} ${t("title-2")}`;
    const strongWord = t("title-strong").trim();
    title.innerHTML = "";

    const container = document.createElement("div");
    container.className = "justify-center sm:justify-start";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "0.25em";

    // Filter out empty strings and trim whitespace
    const words = fullText.split(" ").filter((word) => word.trim().length > 0);

    words.forEach((word) => {
      const wordContainer = document.createElement("div");
      wordContainer.style.display = "inline-flex";

      // Single color comparison
      if (word.trim() === strongWord) {
        wordContainer.className = "text-sl-accent";
      }

      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        wordContainer.appendChild(span);
        chars.current.push(span);
      });

      container.appendChild(wordContainer);
    });

    title.appendChild(container);

    // Animations remain the same
    tl.from(chars.current, {
      duration: 0.8,
      y: 100,
      rotationX: -90,
      stagger: 0.02,
      opacity: 0,
      ease: "back.out(1.7)",
    })
      .from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
  });

  return (
    <>
      <div className="flex sm:hidden absolute h-screen bg-accent w-full flex-col-reverse">
        <div>
          <Image
            width={1080}
            height={1080}
            className="aspect-[9/16] w-full h-[70vh] object-cover sm:rounded-full bg-accent"
            src="/herro-picture.png"
            alt=""
          />
        </div>
      </div>
      <div className="relative h-screen sm:h-fit flex flex-row-reverse mx-8 gap-x-5 lg:gap-x-20 lg:max-w-7xl justify-self-center">
        <div className="hidden sm:block relative aspect-square sm:h-48 sm:mt-60 md:h-56 lg:h-96 lg:mt-40">
          <Image
            height={400}
            width={400}
            className="aspect-square w-auto sm:h-48 md:h-56 lg:h-96 object-cover rounded-full bg-accent"
            src="/herro-picture.png"
            alt=""
          />
        </div>
        <div className="w-full py-[calc(100vh-90vh)] sm:py-48 lg:py-56">
          <div className="mb-8 flex justify-center">
            <div className="hidden">
              {t("announcement")}{" "}
              <Link href={"#"} className="font-semibold text-">
                <span aria-hidden="true" className="absolute inset-0" />
                {t("announcement-link")} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center sm:text-start">
            <h1
              ref={titleRef}
              className="text-balance text-5xl font-semibold tracking-tight text-sl-primary md:text-6xl lg:text-7xl"
            >
              <div>
                {t("title-1")}{" "}
                <strong className="text-accent">{t("title-strong")}</strong>
                {t("title-2")}
              </div>
            </h1>
            <p
              ref={subtitleRef}
              className="mt-8 text-pretty text-lg font-medium text-sl-secondary sm:text-xl/8"
            >
              {t("under-title")}
            </p>
            <div
              ref={buttonRef}
              className="mt-10 flex items-center justify-center sm:justify-start gap-x-6"
            >
              <a
                href={"/dashboard"}
                className="rounded-2xl bg-sl-accent hover:bg-sl-accent-hover px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 ease-in-out"
              >
                {t("action-button")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
