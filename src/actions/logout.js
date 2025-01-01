"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function logout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log("Error logging out: ", error);
        return { error: "Something went wrong" };
    }

    revalidatePath("/", "layout");
    return { success: "Logout successful!" };
}