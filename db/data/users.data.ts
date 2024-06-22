"use server";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { Session, User } from "@supabase/supabase-js";

export async function getUser(
  supabase: TypedSupabaseClient,
): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}

export async function getUserSession(
  supabase: TypedSupabaseClient,
): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
}
