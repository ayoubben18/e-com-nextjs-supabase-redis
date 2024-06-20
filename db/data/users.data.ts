import { Database } from "@/types/database.types";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";

export async function getUser(
  supabase: SupabaseClient<Database>,
): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}

export async function getUserSession(
  supabase: SupabaseClient<Database>,
): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
}
