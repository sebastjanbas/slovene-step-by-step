"use client";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function FAQ() {
  const t = useTranslations("FAQ");

  const Styles = {
    Title: "text-lg",
    Text: "px-1 py-3 text-light-3 dark:text-dark-3 text-base",
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="getting-started"
    >
      <AccordionItem value="getting-started" className="py-2">
        <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-light-1 dark:text-dark-1">
          {t("q1")}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={Styles.Text}>{t("a1")}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="properties" className="py-2">
        <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-light-1 dark:text-dark-1">
          {t("q2")}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={Styles.Text}>{t("a2")}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="advanced-usage" className="py-2">
        <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-light-1 dark:text-dark-1">
          {t("q3")}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={Styles.Text}>{t("a3")}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="community-and-support" className="py-2">
        <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-light-1 dark:text-dark-1">
          {t("q4")}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={Styles.Text}>{t("a4")}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
