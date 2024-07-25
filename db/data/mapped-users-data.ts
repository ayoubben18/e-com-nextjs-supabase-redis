"use server";

import { handleStatus } from "@/errors/handleStatus";
import { Users } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";

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

  handleStatus(error, status, data) as Users | null;
};

const updateUser = async (
  supabase: TypedSupabaseClient,
  id: string,
  name: string,
) => {
  const { data, error, status } = await supabase.from("users").update({
    name: name,
  }).eq("id", id).select("*").single();

  handleStatus(error, status, data) as Users | null;
};

const getMappedUser = async (
  supabase: TypedSupabaseClient,
  email: string,
  id: string,
) => {
  const { data, error, status } = await supabase.from("users").select("*")
    .eq("email", email).eq("id", id).single();

  return handleStatus(error, status, data) as Users | null;
};

export { getMappedUser, mapUser, updateUser };
