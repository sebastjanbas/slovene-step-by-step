'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SignupSchema } from '@/schemas'

export async function signup(values) {

    const validateField = SignupSchema.safeParse(values);


    if (!validateField.success) {
        return { error: 'Invalid fields' };
    }

    if (validateField.data.password !== validateField.data.confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    const supabase = await createClient()
      
    const userData = {
        email: validateField.data.email,
        password: validateField.data.password,
        options: {
            data: {
                full_name: validateField.data.firstName + ' ' + validateField.data.lastName,
                // avatar_url: "https://gravatar.com/avatar",
            },
        },
    }
    
    const { data, error } = await supabase.auth.signUp(userData)

    if (data.user.identities.length === 0) {
        return {error: 'User already exists'}
    }

    if (error) {
        console.log("ERROR: ", error)
        if (error.code === "email_address_invalid") return { error: "Invalid email address" }
        if (error.code === "user_already_exists") return { error: "User already exists" }
        return { error: "Something went wrong" }
    }
    
    revalidatePath('/', 'layout')
    return { success: 'Verification email send!' }

    // redirect('/')
  }