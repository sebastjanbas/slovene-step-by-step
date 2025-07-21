"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const AccordionCustom = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          value={item.trigger}
          className="py-2 w-full flex flex-col justify-center items-center"
        >
          <AccordionTrigger className="hover:no-underline cursor-pointer w-fit text-left text-custom-light-1 dark:text-custom-dark-1">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-md/6 space-y-10">
              {item.content.map((content, contentIndex) => (
                <p
                  key={contentIndex}
                  className="text-base px-1 text-custom-light-3 dark:text-custom-dark-3"
                >
                  {content}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
