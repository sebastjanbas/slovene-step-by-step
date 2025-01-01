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
      
    const data = {
        email: validateField.data.email,
        password: validateField.data.password,
        options: {
            data: {
                name: validateField.data.firstName + ' ' + validateField.data.lastName,
            },
        },
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    console.log("SINGING IN THE USER ... ");

    if (error) {
        return { error: "Something went wrong" }
    }
    
    revalidatePath('/', 'layout')
    return { success: 'Verification email send!' }

    // redirect('/')
  }