import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export const useWelcomeRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (isLoaded && user) {
      const welcome = user.unsafeMetadata?.welcome;
      const onboardingCompleted = user.unsafeMetadata?.onboardingCompleted;
      
      // If user should see welcome page and is not already on it
      if (welcome === true && !pathname.includes("/welcome")) {
        redirect({ href: "/welcome", locale: locale });
        return;
      }
      
      // If user has completed onboarding and is on welcome page, redirect to dashboard
      if (onboardingCompleted === true && pathname.includes("/welcome")) {
        redirect({ href: "/dashboard", locale: locale });
        return;
      }
    }
  }, [isLoaded, user, router, pathname, locale]);

  return { isLoaded, user };
};
