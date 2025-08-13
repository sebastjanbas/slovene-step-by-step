import "./globals.css";
import { LocaleProvider } from "@/contexts/locale-context";
import { DynamicClerkProvider } from "@/components/providers/dynamic-clerk-provider";
import { Suspense } from "react";

export const metadata = {
  title: {
    default: "Slovene Step by Step | Become fluent in Slovene",
    template: "%s | Slovene Step By Step",
  },
  description:
    "Slovene Step by Step personalized Slovene lessons tailored to your goals. Learn online at your convenience with experienced teachers and join a supportive community of over 1,200 members. Start today and achieve your language goals with Slovene Step by Step!",
  metadataBase: new URL("https://slovene-step-by-step.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://slovene-step-by-step.vercel.app/en",
      en: "https://slovene-step-by-step.vercel.app/en",
      sl: "https://slovene-step-by-step.vercel.app/sl",
      ru: "https://slovene-step-by-step.vercel.app/ru",
      it: "https://slovene-step-by-step.vercel.app/it",
    },
  },
  openGraph: {
    type: "website",
    url: "https://slovene-step-by-step.vercel.app",
    siteName: "Slovene Step by Step | Become fluent in Slovene",
    images: [
      {
        url: "/meta-image-link.jpg",
        width: 769,
        height: 445,
        alt: "Slovene Step By Step Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children, params }) {
  const { locale } = params || {};
  const initialLocale = locale || "en";

  return (
    <Suspense>
      <LocaleProvider initialLocale={initialLocale}>
        <DynamicClerkProvider>{children}</DynamicClerkProvider>
      </LocaleProvider>
    </Suspense>
  );
}
