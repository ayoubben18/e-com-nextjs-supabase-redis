"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

export async function getUserId(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}
