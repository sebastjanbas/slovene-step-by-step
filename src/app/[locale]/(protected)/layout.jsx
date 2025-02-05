import InfoBar from "@/components/protected-components/Infobar";
import MenuOptions from "@/components/protected-components/MenuOption";
import Banner from "@/components/ui/Banner";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



const ProtectedLayout = async ({ children }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <>
            <Banner textColor={"text-[#DC770A]"} bgColor={"bg-[#FFFFD0]"} />
            <div className="flex overflow-hidden h-screen">
                <div className="hidden sm:block">
                    <MenuOptions />
                </div>
                <div className="w-full">

                    <InfoBar />
                    {children}
                </div>
            </div>
        </>
    );
}

export default ProtectedLayout