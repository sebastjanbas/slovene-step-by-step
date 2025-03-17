import { AppSidebar } from "@/components/app-sidebar";
import ErrorHangling from "@/components/dashboard/error-handling";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
      <SidebarProvider>
        <ErrorHangling />
        <AppSidebar />
        <SidebarInset>
          <header className="flex border-foreground/50 border-b-[1px] h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
  );
};

export default ProtectedLayout;
