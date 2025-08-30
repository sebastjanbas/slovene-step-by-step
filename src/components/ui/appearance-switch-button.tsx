"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  IconLoaderQuarter,
  IconMoonStars,
  IconSunHighFilled,
} from "@tabler/icons-react";

export function ThemButton({
  className,
  ...props
}: { className?: string } & React.ComponentPropsWithoutRef<typeof Button> & {
    size?: number;
  }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, render a placeholder or nothing until mounted
    return (
      <Button
        variant="ghost"
        className={cn("mr-5 cursor-pointer !p-2 h-fit", className)}
        aria-label="Toggle theme"
        disabled
        {...props}
      >
        {/* Optionally, a neutral icon or nothing */}
        <IconLoaderQuarter className="w-5 h-5 animate-spin" />
      </Button>
    );
  }

  if (theme === "light") {
    return (
      <Button
        variant="ghost"
        onClick={() => setTheme("dark")}
        className={cn("mr-5 cursor-pointer !p-2 h-fit", className)}
        aria-label="Switch to dark theme"
        {...props}
      >
        <IconSunHighFilled className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme("light")}
      className={cn("mr-5 cursor-pointer !p-2 h-fit", className)}
      aria-label="Switch to light theme"
      {...props}
    >
      <IconMoonStars className="w-5 h-5" />
    </Button>
  );
}
