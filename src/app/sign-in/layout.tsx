"use client";

import { ReactNode } from "react";

export default function SignInLayout({ params, children }) {
  const { locale } = params || {};
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
