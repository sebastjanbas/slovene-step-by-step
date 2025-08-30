"use client";

import { useWelcomeRedirect } from "@/hooks/use-welcome-redirect";
import { ReactNode } from "react";

interface WelcomeRedirectProviderProps {
  children: ReactNode;
}

export const WelcomeRedirectProvider = ({
  children,
}: WelcomeRedirectProviderProps) => {
  useWelcomeRedirect();

  return <>{children}</>;
};
