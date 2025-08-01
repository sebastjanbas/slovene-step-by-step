import { UserProvider } from "@/components/dashboard/auth/user-context";
import { SiteHeader } from "@/components/dashboard/sidebar/app-header";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import BackgroundUpdater from "@/components/ui/background-updater";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
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
