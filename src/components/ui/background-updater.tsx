/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function BackgroundUpdater() {
  const { theme, resolvedTheme } = useTheme();

  const updateBackground = () => {
    const color = "#4b4768";
    const isDark = (theme ?? resolvedTheme) === "dark";

    if (!isDark) {
      document.documentElement.style.setProperty("--background", color);
    } else {
      // Optional: clear it so dark mode fallback is used from .dark in CSS
      document.documentElement.style.removeProperty("--background");
    }
  };

  useEffect(() => {
    updateBackground();
  }, [theme, resolvedTheme]); // Re-run whenever theme changes

  return null;
}
