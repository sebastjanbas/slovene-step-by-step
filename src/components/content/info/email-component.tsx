"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export const EmailComponent = ({ title, subtitle, buttontext }) => {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24 lg:py-32 mx-auto max-w-lg md:max-w-4xl px-6 lg:px-8">
      <h2 className="text-4xl font-semibold tracking-tight text-light-1 dark:text-dark-1">
        {title}
      </h2>
      <p className="mt-4 text-lg text-light-2 dark:text-dark-2">{subtitle}</p>
      <Button variant="mine" className="mt-8" asChild>
        <a href="mailto:sebastjan.bas@gmail.com?cc=almn140803@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>">
          {buttontext}
        </a>
        {/* <Link href='/info/contact-us'>
                    {buttontext}
                </Link> */}
      </Button>
    </div>
  );
};
