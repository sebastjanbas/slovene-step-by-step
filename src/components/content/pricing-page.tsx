"use client";
import { offers } from "@/lib/docs";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingContent() {
  const t = useTranslations("pricing.plans");
  const t2 = useTranslations("pricing.cta");
  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-6 sm:mt-20 sm:gap-y-0 md:max-w-5xl md:grid-cols-3">
      {offers.map((tier, tierIdx) => (
        <div
          key={tier.id}
          className={classNames(
            tier.featured
              ? "relative bg-gradient-primary shadow-2xl ring-2 ring-sl-accent/50 scale-105"
              : "bg-gradient-primary-subtle border border-border/50 sm:mx-0 md:mx-0",
            "rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:shadow-sl-accent/20",
            tier.featured ? "z-10" : "hover:scale-[1.01]",
          )}
        >
          {tier.featured && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary rounded-t-3xl" />
          )}
          <h3
            id={tier.id}
            className={classNames(
              "text-sm font-semibold uppercase tracking-wider mb-2 text-sl-accent",
            )}
          >
            {tier.name}
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span
              className={classNames(
                "text-5xl font-bold tracking-tight text-sl-primary",
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
                tier.featured ? "text-foreground" : "text-sl-secondary",
                "text-base font-medium",
              )}
            >
              /{t("session")}
            </span>
          </p>
          <p
            className={classNames(
              tier.featured
                ? "text-sl-secondary dark:text-foreground"
                : "text-sl-secondary",
              "mt-6 text-base/7",
            )}
          >
            {t(`plan${tierIdx + 1}.description`)}
          </p>
          <ul
            role="list"
            className={classNames("mt-8 space-y-4 text-sm/6 sm:mt-10")}
          >
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-x-3">
                <div
                  className={classNames(
                    "flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sl-accent/40",
                  )}
                >
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames("text-white", "h-3.5 w-3.5")}
                  />
                </div>
                <span
                  className={classNames(
                    tier.featured
                      ? "text-sl-secondary dark:text-foreground"
                      : "text-sl-secondary",
                  )}
                >
                  {t(`plan${tierIdx + 1}.features.${i}`)}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={tier.href}
            aria-describedby={tier.id}
            className={classNames(
              tier.featured
                ? "bg-background text-sl-accent dark:text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-sl-accent/20 dark:shadow-xl"
                : "bg-gradient-primary text-sl-secondary hover:opacity-90 shadow-lg shadow-sl-accent/20 hover:shadow-xl hover:shadow-sl-accent/30 transition-all duration-300",
              "mt-8 block rounded-xl px-4 py-3 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sl-accent sm:mt-10 border-sl-accent/50 border-[1px]",
            )}
          >
            {t2("button")}
          </a>
        </div>
      ))}
    </div>
  );
}
