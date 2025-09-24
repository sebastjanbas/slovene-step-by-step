"use client";

import { SignInPoster } from "@/components/icons/sign-in-poster";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { SignIn } from "@clerk/nextjs";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function SigninPage() {
  const { locale } = useLocale();
  return (
    <div className="relative w-screen p-0 m-0 h-screen overflow-hidden flex justify-center items-center">
      <Button variant="link" size="icon" className="absolute top-4 left-4">
        <Link href="/">
          <IconChevronLeft className="size-8" />
        </Link>
      </Button>
      <div className="h-full flex flex-row w-full max-w-6xl justify-between items-center mx-auto p-10">
        <SignIn
          fallback={
            <div className="w-[450px] h-[350px] bg-foreground/5 animate-pulse rounded-3xl p-5">
              <div className="w-[150px] h-[20px] mx-auto mt-8 bg-foreground/10 animate-pulse rounded-full" />
              <div className="w-[350px] h-[30px] mx-auto mt-8 bg-foreground/15 animate-pulse rounded-full" />
              <div className="w-[350px] h-[2px] mx-auto mt-8 bg-foreground/10 animate-pulse rounded-full" />
              <div className="w-[150px] h-[15px] ml-8 mt-8 bg-foreground/10 animate-pulse rounded-full" />
              <div className="w-[350px] h-[30px] mx-auto mt-2 bg-foreground/15 animate-pulse rounded-full" />
              <div className="w-[350px] h-[35px] mx-auto mt-8 bg-foreground/20 animate-pulse rounded-full" />
            </div>
          }
          appearance={{
            elements: {
              cardBox: {
                boxShadow: "none",
                borderRadius: 35,
                width: "450px",
              },
              card: {
                boxShadow: "none",
                borderRadius: 0,
              },
              footer: {
                display: "none",
              },
            },
          }}
          unsafeMetadata={{
            locale: locale,
            welcome: true,
          }}
        />
        <SignInPoster />
      </div>
    </div>
  );
}
