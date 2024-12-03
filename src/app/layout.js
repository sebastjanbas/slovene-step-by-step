import React from "react";
import NavBar from "@/components/navbar/NavBar";
import "./global.css";
import AnimatedLayout from "@/components/ui/AnimatedLayout";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata = {
  title: "Slovene Step By Step",
  description: "The best way to learn slovene",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://generalseba.github.io/slovene-step-by-step/icon.svg"
      />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <AnimatedLayout>
            <main className="relative isolate px-6 pt-14 lg:px-8">
              {children}
            </main>
          </AnimatedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
