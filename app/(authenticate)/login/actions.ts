"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import loginSchema from "@/schema/loginSchema";

export async function login(values: z.infer<typeof loginSchema>) {
  const supabase = createClient();

  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    return { error: error.message };
  }

  redirect("/search");
}
