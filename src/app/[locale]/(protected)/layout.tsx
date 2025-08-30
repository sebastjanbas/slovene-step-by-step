import { UserProvider } from "@/components/dashboard/auth/user-context";
import { SiteHeader } from "@/components/dashboard/sidebar/app-header";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect as redirectI18n } from "@/i18n/routing";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const { userId } = await auth();
  const { locale } = await params;

  if (!userId) {
    redirect(`/sign-in?locale=${locale}`);
  }
  const user = await currentUser();

  const hasCompletedOnboarding = user.unsafeMetadata?.onboardingCompleted;
  if (!hasCompletedOnboarding) {
    redirectI18n({ href: "/welcome", locale: locale });
  }

  return (
    <>
      <UserProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 18)",
            } as React.CSSProperties
          }
        >
          <Suspense fallback={<div>Loading...</div>}>
            <AppSidebar variant="inset" locale={locale} />
          </Suspense>
          <SidebarInset className="overflow-hidden bg-white dark:bg-background">
            <SiteHeader />
            <main className="bg-white dark:bg-background h-[90vh] overflow-y-scroll">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </>
  );
};

export default ProtectedLayout;
