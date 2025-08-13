"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { IconMoonStars, IconSunHighFilled } from "@tabler/icons-react";

export function ThemButton({
  className,
  ...props
}: { className?: string } & React.ComponentPropsWithoutRef<typeof Button> & {
    size?: number;
  }) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn("mr-5 cursor-pointer !p-2 h-fit", className)}
      {...props}
    >
      {/* moon */}
      <IconMoonStars className={theme === "dark" ? "block" : "hidden"} />

      {/* sun */}
      <IconSunHighFilled
        className={theme === "dark" ? "hidden" : "block hover:text-foreground"}
      />
    </Button>
  );
}
