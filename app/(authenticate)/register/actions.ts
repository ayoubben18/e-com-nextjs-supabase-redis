import { mappedUserService } from "@/db/service/user-service";
import registerSchema from "@/schema/registerSchema";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";

export async function signup(values: z.infer<typeof registerSchema>) {
  const supabase = createClient();

  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }

  const { error, data } = await supabase.auth.signUp({
    password: values.password,
    email: values.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  await mappedUserService(data.user?.id || "", values.email, values.name);

  return {
    success: [
      "Registration successful!",
      "Please check your email to verify your account.",
    ],
  };

  // redirect("/login");
}
