import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



const ProtectedLayout = async ({ children }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <div>{children}</div>
    )
}

export default ProtectedLayout