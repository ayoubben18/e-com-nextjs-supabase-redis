"use server";

import { handleStatus } from "@/errors/handleStatus";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { User } from "@supabase/supabase-js";

const mapUser = async (
  supabase: TypedSupabaseClient,
  id: string,
  email: string,
  name: string,
) => {
  const { data, error, status } = await supabase.from("users").insert([
    {
      id: id,
      email: email,
      name: name,
    },
  ]).select("*").single();

  handleStatus(error, status, data) as User | null;
};

const updateUser = async (
  supabase: TypedSupabaseClient,
  id: string,
  name: string,
) => {
  const { data, error, status } = await supabase.from("users").update({
    name: name,
  }).eq("id", id).select("*").single();

  handleStatus(error, status, data) as User | null;
};

const getMappedUser = async (
  supabase: TypedSupabaseClient,
  email: string,
  id: string,
) => {
  const { data, error, status } = await supabase.from("users").select("*")
    .eq("email", email).eq("id", id);

  return handleStatus(error, status, data) as User | null;
};

export { getMappedUser, mapUser, updateUser };
