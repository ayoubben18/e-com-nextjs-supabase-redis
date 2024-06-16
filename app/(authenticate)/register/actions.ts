import registerSchema from "@/schema/registerSchema";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";

export async function signup(values: z.infer<typeof registerSchema>) {
  const supabase = createClient();

  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }

  const { error } = await supabase.auth.signUp({
    password: values.password,
    email: values.email,
    options: {
      data: { username: values.username },
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: [
      "Registration successful!",
      "Please check your email to verify your account.",
    ],
  };

  // redirect("/login");
}
