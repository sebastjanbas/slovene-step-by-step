"use client";

import { Button } from "@/components/ui/button";
import { ThemButton } from "@/components/ui/appearance-switch-button";
import { useLocale } from "@/contexts/locale-context";
import { SignIn } from "@clerk/nextjs";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function SigninPage() {
  const { locale } = useLocale();

  return (
    <div className="relative w-screen p-0 m-0 h-screen overflow-hidden flex justify-center items-center">
      {/* Gradient Background - matching landing page style */}
      <div className="absolute inset-0 -z-10 gradient-primary-subtle opacity-60 dark:opacity-40" />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 z-10 backdrop-blur-sm bg-background/80 hover:bg-background/90 border border-border/50"
      >
        <Link href="/">
          <IconChevronLeft className="size-5" />
        </Link>
      </Button>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-10">
        <ThemButton className="backdrop-blur-sm bg-background/80 hover:bg-background/90 border border-border/50" />
      </div>

      <div className="relative z-10 h-full flex flex-row w-full max-w-7xl justify-between items-center mx-auto p-6 lg:p-12 gap-8">
        {/* Sign In Form */}
        <div className="flex-1 flex justify-center items-center min-w-0">
          <div className="w-full max-w-[450px]">
            <SignIn
              fallback={
                <div className="w-full h-[500px] bg-card/50 backdrop-blur-sm animate-pulse rounded-3xl p-8 border border-border/50">
                  <div className="w-[150px] h-[24px] mx-auto mt-8 bg-foreground/10 animate-pulse rounded-full" />
                  <div className="w-full h-[40px] mx-auto mt-8 bg-foreground/15 animate-pulse rounded-lg" />
                  <div className="w-full h-[1px] mx-auto mt-8 bg-foreground/10 animate-pulse rounded-full" />
                  <div className="w-[120px] h-[16px] ml-0 mt-8 bg-foreground/10 animate-pulse rounded-full" />
                  <div className="w-full h-[40px] mx-auto mt-3 bg-foreground/15 animate-pulse rounded-lg" />
                  <div className="w-full h-[44px] mx-auto mt-8 bg-foreground/20 animate-pulse rounded-lg" />
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
                  socialButtonsBlockButton: {
                    borderRadius: "10px",
                  },
                  input: {
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                  },
                  formButtonPrimary: {
                    borderRadius: "10px",
                  },
                },
              }}
              unsafeMetadata={{
                locale: locale,
                welcome: true,
              }}
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative h-full max-h-[800px]">
          <div className="relative w-full h-full max-w-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-sl-blue/20 via-sl-purple/20 to-sl-pink/20 dark:from-sl-blue/30 dark:via-sl-purple/30 dark:to-sl-pink/30 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop"
              alt="Language learning"
              fill
              className="object-cover dark:opacity-90"
              priority
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 dark:from-background/80 via-transparent to-transparent z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
