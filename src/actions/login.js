'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LoginSchema } from '@/schemas'

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
          return { error: "Something went wrong" }
      }
      
      revalidatePath("/", "layout");
      // revalidatePath("/");
      return { success: 'Login successful!' }

  
  }
