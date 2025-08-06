"use client";
import React from "react";
import { useUserInfo } from "../auth/user-context";
import { useTranslations } from "next-intl";

const Greeting = () => {
  const user = useUserInfo();
  const t = useTranslations("dashboard");
  if (!user) {
    return (
      <div className="inline-flex gap-2 justify-center items-center pb-3">
        <h1 className="text-2xl md:text-4xl pb-3 tracking-tight">
          Welcome back
        </h1>
      </div>
    );
  }
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: t.markup("greeting", {
          important: (chunks) => `
          <strong style="font-weight: 500;">${chunks}</strong>
          `,
          name: user.name.split(" ")?.[0],
        }),
      }}
      className="block text-2xl md:text-4xl pb-3 tracking-tight"
    />
  );
};

export default Greeting;
