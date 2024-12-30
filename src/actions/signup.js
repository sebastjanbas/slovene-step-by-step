'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SignupSchema } from '@/schemas'

export async function signup(values) {

    console.log("ENTERING THE SIGNUP FUNCTION ...")
    
    const validateField = SignupSchema.safeParse(values);

    console.log("VALIDATE FIELD: ", validateField)

    if (!validateField.success) {
        return { error: 'Invalid fields' };
    }

    if (validateField.data.password !== validateField.data.confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    console.log("PASSWORDS MATCH ...")

    const supabase = await createClient()
      
    // type-casting here for convenience
    // in practice, you should validate your inputs
    // const data = {
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // }
    const data = {
        email: validateField.data.email,
        password: validateField.data.password,
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    console.log("SINGING IN THE USER ... ");

    if (error) {
        console.log("ERROR: ", error.code);
        return { error: "Something went wrong" }
    }
    
    revalidatePath('/', 'layout')
    console.log("SENDING THE VERIFICATION EMAIL ...")
    return { success: 'Verification email send!' }

    // redirect('/')
  }