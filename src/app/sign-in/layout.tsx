"use client";

import { ReactNode, Suspense } from "react";
import { LocaleProvider } from "@/contexts/locale-context";
import { DynamicClerkProvider } from "@/components/providers/dynamic-clerk-provider";

interface SignInLayoutProps {
  children: ReactNode;
}

export default function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider>
            <DynamicClerkProvider>{children}</DynamicClerkProvider>
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
