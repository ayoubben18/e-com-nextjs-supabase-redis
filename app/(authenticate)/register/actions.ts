import registerSchema from "@/schema/registerSchema";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";

export async function signup(values: z.infer<typeof registerSchema>) {
  const supabase = createClient();

  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }
  let whatENV;
  const env = process.env.NODE_ENV;
  if (env === "development") {
    whatENV = "http://localhost:3000";
  } else if (env === "production") {
    whatENV = process.env.NEXT_PUBLIC_URL!;
  }
  const { error } = await supabase.auth.signUp({
    password: values.password,
    email: values.email,
    options: {
      data: { username: values.username },
      emailRedirectTo: `${whatENV}/auth/callback`,
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
