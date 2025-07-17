"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export const SplitScreen = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  if (pathname.includes("reset-password")) {
    return null;
  }
  return (
    <div className="hidden md:flex md:h-full w-full bg-accent/80 dark:bg-accent-foreground/80">
      {children}
    </div>
  );
};
