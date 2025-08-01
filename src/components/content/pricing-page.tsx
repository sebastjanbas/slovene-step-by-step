"use client";
import { offers } from "@/lib/docs";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingContent() {
  const t = useTranslations("Pricing");
  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 md:max-w-4xl md:grid-cols-3">
      {offers.map((tier, tierIdx) => (
        <div
          key={tier.id}
          className={classNames(
            tier.featured
              ? "relative bg-sl-secondary dark:bg-[#1E1E1E] shadow-2xl"
              : "bg-white/60 dark:bg-[#171717] sm:mx-8 md:mx-0",
            tier.featured
              ? ""
              : tierIdx === 0
              ? "rounded-t-3xl sm:rounded-b-none md:rounded-bl-3xl md:rounded-tr-none"
              : "sm:rounded-t-none md:rounded-bl-none md:rounded-tr-3xl",
            "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
          )}
        >
          <h3
            id={tier.id}
            className={classNames(
              tier.featured ? "text-[#ffa756]" : "text-sl-accent",
              "text-base/7 font-semibold"
            )}
          >
            {tier.name}
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span
              className={classNames(
                tier.featured ? "text-white" : "text-sl-primary",
                "text-5xl font-semibold tracking-tight"
              )}
            >
              {tier.priceMonthly.split(".")[0]}
              <span className="text-4xl">
                {tier.priceMonthly.split(".").length > 1 &&
                  "." + tier.priceMonthly.split(".")[1]}
              </span>
            </span>
            <span
              className={classNames(
                tier.featured
                  ? "text-neutral-200 dark:text-foreground/60"
                  : "text-foreground/50",
                "text-base"
              )}
            >
              /{t("session")}
            </span>
          </p>
          <p
            className={classNames(
              tier.featured ? "text-white" : "text-sl-primary",
              "mt-6 text-base/7"
            )}
          >
            {t(tier.description)}
          </p>
          <ul
            role="list"
            className={classNames(
              tier.featured ? "text-white pb-10" : "text-sl-primary",
              "mt-8 space-y-3 text-sm/6 sm:mt-10"
            )}
          >
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon
                  aria-hidden="true"
                  className={classNames(
                    tier.featured ? "text-sl-accent" : "text-sl-accent",
                    "h-6 w-5 flex-none"
                  )}
                />
                {t(feature)}
              </li>
            ))}
          </ul>
          <a
            href={tier.href}
            aria-describedby={tier.id}
            className={classNames(
              tier.featured
                ? "bg-sl-accent transition-colors duration-200 ease-in-out text-white shadow-sm hover:bg-sl-accent-hover focus-visible:outline-button"
                : "text-sl-accent ring-1 ring-inset ring-sl-accent-hover hover:ring-sl-accent focus-visible:outline-sl-accent",
              "mt-8 block rounded-xl px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-offset-2 sm:mt-10"
            )}
          >
            {t("plan-button")}
          </a>
        </div>
      ))}
    </div>
  );
}
