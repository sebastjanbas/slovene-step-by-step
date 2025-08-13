/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { webNavigation } from "@/lib/docs";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import { useUser } from "@clerk/nextjs";
import MobileNavigationDialog from "./mobile-navigation-dialog";
import { IconLogo } from "@/components/icons/icon-logo";
import { ThemButton } from "@/components/ui/appearance-switch-button";
import { Link } from "@/i18n/routing";

export default function NavBar({ locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common");
  const { user } = useUser();

  if (pathname.includes("/auth") || pathname.includes("/legal")) {
    return null;
  }

  return (
    <header className="relative bg-white/80 dark:bg-[#121212]/80 py-1 lg:py-2 border-b-[1px] border-gray-300 dark:border-gray-700 backdrop-blur-md inset-x-0 top-0 z-40">
      <nav
        aria-label="Global"
        className="relative flex justify-between items-center h-16 mx-auto lg:container lg:px-16 xl:px-20"
      >
        <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                type="button"
                className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
              >
                <span className="sr-only">Slovene Step By Step</span>
                <IconLogo className={"size-5 h-7 w-auto"} />
              </Link>
            </div>

            <nav className="relative z-10 flex-1 items-center justify-center hidden pl-8 sm:space-x-4 lg:flex h-16">
              <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                {webNavigation.map((item) => (
                  <li className="text-sm font-medium" key={item.name}>
                    <Link
                      href={item.href as any}
                      className="group/menu-item flex items-center text-sm hover:text-accent select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-foreground focus-visible:text-brand-link"
                    >
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1">
                          <p className="leading-snug text-foreground group-hover/menu-item:text-brand-link">
                            {t(`navigation.${item.name}`)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="absolute left-0 top-full flex justify-center"></div>
            </nav>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-fit mx-5">
              <LanguageSwitcher className="rounded-lg" locale={locale} />
            </div>
            <ThemButton className="rounded-lg" />
            {user ? (
              <>
                {/* <UserButton dialog={false} /> */}
                <Link
                  href="/dashboard"
                  className="relative dark:border-gray-700 justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-[8px] outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 text-xs px-2.5 py-1 lg:px-4 lg:py-[15px] lg:rounded-xl h-[26px] hidden lg:flex lg:justify-center lg:items-center"
                >
                  <p className="truncate">{t("navigation.dashboard")}</p>
                </Link>
              </>
            ) : (
              <a
                href={`/sign-in?locale=${locale}`}
                className="relative dark:border-gray-700 justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-[8px] outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 text-xs px-2.5 py-1 h-[26px] hidden lg:block"
              >
                <p className="truncate">{t("buttons.log-in")}</p>
              </a>
            )}
          </div>
        </div>
        <div className="inset-y-0 flex mr-2 items-center px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground-lighter focus:ring-transparent bg-transparent hover:text-foreground-light transition-colors hover:bg-overlay inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset cursor-pointer"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="size-6 text-gray-400 dark:text-gray-400"
            />
          </button>
        </div>
      </nav>
      <MobileNavigationDialog
        webNavigation={webNavigation}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        locale={locale}
      />
    </header>
  );
}
