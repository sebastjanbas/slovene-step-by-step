"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";

export default function SignInLayout({ params, children }) {
  const { locale } = params || {};
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
