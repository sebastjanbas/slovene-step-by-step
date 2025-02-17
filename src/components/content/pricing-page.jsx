"use client";
import { offers } from '@/lib/docs';
import { CheckIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function PricingContent() {
    const t = useTranslations("Pricing");
    return (

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 md:max-w-4xl md:grid-cols-3">
            {offers.map((tier, tierIdx) => (
                <div
                    key={tier.id}
                    className={classNames(
                        tier.featured ? 'relative bg-custom-light-2 dark:bg-[#1E1E1E] shadow-2xl' : 'bg-white/60 dark:bg-[#171717] sm:mx-8 md:mx-0',
                        tier.featured
                            ? ''
                            : tierIdx === 0
                                ? 'rounded-t-3xl sm:rounded-b-none md:rounded-bl-3xl md:rounded-tr-none'
                                : 'sm:rounded-t-none md:rounded-bl-none md:rounded-tr-3xl',
                        'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                    )}
                >
                    <h3
                        id={tier.id}
                        className={classNames(tier.featured ? 'text-[#ffa756] dark:text-custom-accent-d' : 'text-custom-accent-l', 'text-base/7 font-semibold')}
                    >
                        {tier.name}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                        <span
                            className={classNames(
                                tier.featured ? 'text-white' : 'text-custom-light-1 dark:text-custom-dark-1',
                                'text-5xl font-semibold tracking-tight',
                            )}
                        >
                            {tier.priceMonthly}
                        </span>
                        <span className={classNames(tier.featured ? 'text-gray-100' : 'text-custom-light-1 dark:text-gray-100', 'text-base')}>/{t("session")}</span>
                    </p>
                    <p className={classNames(tier.featured ? 'text-white dark:text-custom-dark-1' : 'text-custom-light-3 dark:text-custom-dark-1', 'mt-6 text-base/7')}>
                        {t(tier.description)}
                    </p>
                    <ul
                        role="list"
                        className={classNames(
                            tier.featured ? 'text-white pb-10 dark:text-custom-dark-1' : 'text-custom-light-3 dark:text-custom-dark-1',
                            'mt-8 space-y-3 text-sm/6 sm:mt-10',
                        )}
                    >
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <CheckIcon
                                    aria-hidden="true"
                                    className={classNames(tier.featured ? 'text-custom-accent-l' : 'text-custom-accent-l', 'h-6 w-5 flex-none')}
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
                                ? 'bg-custom-button-l text-white shadow-sm hover:bg-custom-button-hover-l focus-visible:outline-custom-button-l'
                                : 'text-custom-accent-l ring-1 ring-inset ring-custom-button-hover-l hover:ring-custom-button-l focus-visible:outline-custom-accent-l',
                            'mt-8 block rounded-xl px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                        )}
                    >
                        {t("plan-button")}
                    </a>
                </div>
            ))}
        </div>
    )
}
