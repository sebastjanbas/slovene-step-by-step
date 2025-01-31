import { DashboardHeader } from "@/components/courses/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";



const ProtectedLayout = async ({ children }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <>
            <div className="flex flex-col h-screen overflow-hidden">
                <DashboardHeader />
                <div className="flex flex-row h-full">
                    <div className="hidden lg:flex sticky flex-col top-0 h-full w-96 border-r-[1px] border-gray-300">
                        <div className="flex flex-row gap-4 items-center px-6 py-4 border-b-[1px] border-gray-300">
                            <Avatar className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <AvatarImage src={user.user_metadata.avatar_url} className="aspect-square h-full w-full" />
                                <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-custom-accent-l">
                                    <FaUser className="text-white" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-bold capitalize text-xl/tight">{user.user_metadata.full_name}</h2>
                                <p className="text-custom-light-2 text-xs/tight">Free Plan</p>
                            </div>
                        </div>
                        <div>
                            NAV PLACEHOLDER
                        </div>
                    </div>
                    <div className="h-full overflow-auto w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProtectedLayout