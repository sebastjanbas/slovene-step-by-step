"use client";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const t = useTranslations("errors.not-found");
  const router = useRouter();
  return (
    <>
      <Button
        variant="link"
        size="icon"
        className="absolute top-4 left-4 cursor-pointer"
        onClick={() => router.back()}
      >
        <IconChevronLeft className="size-8" />
      </Button>
      <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-sl-primary sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-sl-secondary sm:text-xl/8">
        {t("description")}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/" className="font-semibold text-sl-accent hover:underline">
          <span aria-hidden="true">&larr;</span> {t("button")}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
