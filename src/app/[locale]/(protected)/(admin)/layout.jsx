import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminLayout = async ({ children }) => {

    const supabase = await createClient();

    const { data } = await supabase.from("users").select("admin");

    if (data?.[0].admin === false) {
        redirect("/dashboard?error=You are unauthorized to view this page");
    }
    return (
        <div>{children}</div>
    )
}

export default AdminLayout