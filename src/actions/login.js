'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LoginSchema } from '@/schemas'

export async function login(values) {

  console.log("ENTERING THE LOGIN FUNCTION ...")
      
      const validateField = LoginSchema.safeParse(values);
  
      console.log("VALIDATE FIELD: ", validateField);
  
      if (!validateField.success) {
          return { error: 'Invalid fields' };
      }
  
  
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
      const { error } = await supabase.auth.signInWithPassword(data)
    
    
      console.log("LOGGING IN THE USER ... ");
  
      if (error) {
          console.log("ERROR: ", error.code);
          return { error: "Something went wrong" }
      }
      
      revalidatePath('/', 'layout')
      redirect('/')

  
}

