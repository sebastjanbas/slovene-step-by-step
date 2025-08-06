import { UserProvider } from "@/components/dashboard/auth/user-context";
import { SiteHeader } from "@/components/dashboard/sidebar/app-header";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import BackgroundUpdater from "@/components/ui/background-updater";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const { userId } = await auth();
  const { locale } = params;

  if (!userId) {
    redirect(`/sign-in?locale=${locale}`);
  }

  return (
    <>
      <BackgroundUpdater />
      <UserProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 18)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
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
