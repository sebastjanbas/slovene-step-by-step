import { SiteHeader } from "@/components/dashboard/sidebar/app-header";
import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect as redirectI18n } from "@/i18n/routing";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const { userId } = await auth();
  const { locale } = params;

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
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" locale={locale} />
        <SidebarInset>
          <SiteHeader />
          <main className="h-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;
