"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { ResetPasswordSchema } from "@/schemas";

export const resetPassword = async (email) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/update-password",
  });

    if (error) {
        console.log("ERROR: ", error.code);
        return { error: "Reset Password Unavailable" };
    }
    return { success: 'Reset password link sent!' }

};

export const updatePassword = async (values) => {
  const validateValues = ResetPasswordSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid fields" };
  }

  const { password, confirmPassword } = validateValues.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.log("ERROR: ", error.code);
    if (error.code === "same_password") return { error: "Please enter a new password" };
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  return { success: 'Login successful!' }
};
