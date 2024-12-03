"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
    // HYDRATION ISSUE FIX (however there is going to be a white flash every time page is reloaded)
    // const [mounted, setMounted] = useState(false);

    // // Set mounted to true after the first render (client-side only)
    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // // If the component hasn't mounted yet, render nothing (or a loading spinner if needed)
    // if (!mounted) return null;

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
