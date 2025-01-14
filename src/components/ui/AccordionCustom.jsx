"use client"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion-motion';
import { ChevronUp } from 'lucide-react';

export const AccordionCustom = ({ data }) => {
    return (
        <Accordion
            className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700'
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            {data.map((item, index) =>
            (
                <AccordionItem key={index} value={item.trigger} className='py-2 w-full flex flex-col justify-center items-center'>
                    <AccordionTrigger className='w-fit text-left text-custom-light-1 dark:text-custom-dark-1'>
                        <div className='flex items-center justify-center gap-x-2'>
                            <div className={`transition-transform duration-500 group-data-[expanded]:scale-0 group-data-[expanded]:translate-x-[44px]`}>{item.trigger}</div>
                            <ChevronUp className={`h-4 w-4 text-custom-light-1 transition-transform duration-700 group-data-[expanded]:-translate-x-[44px] group-data-[expanded]:-rotate-180 dark:text-custom-dark-1`} />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="text-md/6 space-y-10">
                            {item.content.map((content, contentIndex) => (
                                <p key={contentIndex} className="px-1 text-custom-light-3 dark:text-custom-dark-3">{content}
                                </p>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            )
            )}

        </Accordion>
    )
}
