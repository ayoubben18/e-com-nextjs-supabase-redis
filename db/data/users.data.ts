"use server";

import { Database } from "@/types/database.types";
import { SupabaseClient, User } from "@supabase/supabase-js";

export async function getUserId(
  supabase: SupabaseClient<Database>,
): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}
