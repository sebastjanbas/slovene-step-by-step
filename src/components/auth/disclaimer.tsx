"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const Disclaimer = ({ className }: { className?: string }) => {
  const t = useTranslations("Disclaimer");
  return (
    <div className={cn("relative mt-40 pb-10 bottom-0 w-full", className)}>
      <div className="flex items-center justify-center px-10">
        <p className="text-center text-sm text-light-3 dark:text-dark-3">
          {t("text")}{" "}
          <Link
            href={"/legal/terms-of-service"}
            className="font-medium text-light-1 dark:text-dark-1 hover:underline text-nowrap"
          >
            {t("link-terms")}
          </Link>{" "}
          {t("and")}{" "}
          <Link
            href={"/legal/privacy-policy"}
            className="font-medium text-light-1 dark:text-dark-1 hover:underline text-nowrap"
          >
            {t("link-privacy")}
          </Link>
        </p>
      </div>
    </div>
  );
};
