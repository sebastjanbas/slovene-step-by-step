'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { LoginSchema } from '@/schemas'
import { redirect } from 'next/navigation';

export async function login(values) {
      
    const validateField = LoginSchema.safeParse(values);

    if (!validateField.success) {
        return { error: 'Invalid fields' };
    }

    const supabase = await createClient()

    const data = {
    email: validateField.data.email,
    password: validateField.data.password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)


    if (error) {
        console.log("ERROR: ", error.code);
        if (error.code === "invalid_credentials") return { error: "Invalid credentials" }
        if (error.code === "email_not_confirmed") return { error: "Email not confirmed" }
        return { error: "Something went wrong" }
    }
    
    revalidatePath("/", "layout");
    return { success: 'Login successful!' }

  
}

export async function OAuthSignIn(provider) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider: provider,
        options: {
            // redirectTo: "https://<YOURWEBSITE>/auth/callback",
            redirectTo: "http://localhost:3000/auth/callback",
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
        }
    })

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}