"use client";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion-motion';
import { ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FAQ() {

    const t = useTranslations("FAQ");

    const Styles = {
        Title: "text-lg",
        Text: "px-1 py-3 text-custom-light-3 dark:text-custom-dark-3"
    }


    return (
        <Accordion
            className='flex w-full flex-col gap-2 divide-y divide-zinc-200 dark:divide-zinc-700'
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <AccordionItem value='getting-started' className='py-2'>
                <AccordionTrigger className='w-full pt-2 text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>{t("q1")}</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        {t("a1")}
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='properties' className='py-2'>
                <AccordionTrigger className='w-full pt-2 text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>{t("q2")}</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        {t("a2")}
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='advanced-usage' className='py-2'>
                <AccordionTrigger className='w-full pt-2 text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>{t("q3")}</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        {t("a3")}
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='community-and-support' className='py-2'>
                <AccordionTrigger className='w-full pt-2 text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>{t("q4")}</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        {t("a4")}
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
