"use client";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion-motion';
import { ChevronUp } from 'lucide-react';

export function FAQ() {

    const Styles = {
        Title: "text-lg",
        Text: "px-1 text-custom-light-3 dark:text-custom-dark-3"
    }


    return (
        <Accordion
            className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700'
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <AccordionItem value='getting-started' className='py-2'>
                <AccordionTrigger className='w-full text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>Getting Started</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsum vero ad quam, laboriosam harum aut sequi sed earum quidem optio ea corrupti voluptas totam nostrum veniam. Dolorem, laudantium vel?
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='properties' className='py-2'>
                <AccordionTrigger className='w-full text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>Properties</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt deserunt praesentium perferendis, tempora neque ea officia quae blanditiis fugit eveniet quo in et, sunt ex omnis voluptas autem accusamus nulla?
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='advanced-usage' className='py-2'>
                <AccordionTrigger className='w-full text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>Advanced Usage</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, dolorem vero impedit porro ab ad sed eum nesciunt suscipit corporis quae ipsam. Natus voluptate accusantium earum perspiciatis repellendus nihil velit.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='community-and-support' className='py-2'>
                <AccordionTrigger className='w-full text-left text-custom-light-1 dark:text-custom-dark-1'>
                    <div className='flex items-center justify-between'>
                        <div className={Styles.Title}>Community and Support</div>
                        <ChevronUp className='h-4 w-4 text-custom-light-1 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-custom-dark-1' />
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className={Styles.Text}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad suscipit magnam voluptates perferendis adipisci sit ratione earum assumenda voluptas molestias? Dolores nam quae voluptatem natus quo? Obcaecati adipisci ratione repudiandae?
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
