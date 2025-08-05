"use client";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function FAQ() {
  const t = useTranslations("pricing.faq");

  const Styles = {
    Title: "text-lg",
    Text: "px-1 py-3 text-sl-primary text-base",
  };

  return (
    <>
      <h2 className="text-4xl font-semibold tracking-tight text-sl-primary">
        {t("title")}
      </h2>
      <p className="mt-4 text-lg text-sl-secondary">{t("subtitle")}</p>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="getting-started" className="py-2">
            <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-sl-primary">
              {t("questions.q1")}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className={Styles.Text}>{t("answers.a1")}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="properties" className="py-2">
            <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-sl-primary">
              {t("questions.q2")}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className={Styles.Text}>{t("answers.a2")}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="advanced-usage" className="py-2">
            <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-sl-primary">
              {t("questions.q3")}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className={Styles.Text}>{t("answers.a3")}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="community-and-support" className="py-2">
            <AccordionTrigger className="text-lg hover:no-underline w-full pt-2 text-left text-sl-primary">
              {t("questions.q4")}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className={Styles.Text}>{t("answers.a4")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
