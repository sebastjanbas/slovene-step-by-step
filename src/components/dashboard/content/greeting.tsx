"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {useUser} from "@clerk/nextjs";

const Greeting = () => {
  const {user} = useUser();
  const t = useTranslations("dashboard");
  if (!user) {
    return (
      <h1 className="text-2xl md:text-4xl pb-3 tracking-tight">
        {t("greeting-placeholder")}
      </h1>
    );
  }
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: t.markup("greeting", {
          important: (chunks) => `
          <strong style="font-weight: 500;">${chunks}</strong>
          `,
          name: user.fullName.split(" ")?.[0],
        }),
      }}
      className="block text-2xl md:text-4xl tracking-tight"
    />
  );
};

export default Greeting;
