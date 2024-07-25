"use server";
import cashSchema from "@/schema/cashSchema";
import { Delivery } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { z } from "zod";

export async function getAllDelivery(
  supabase: TypedSupabaseClient,
  userId: string,
): Promise<Delivery[]> {
  const { data, error } = await supabase.from("delivery").select("*").eq(
    "user_id",
    userId,
  );

  if (error) {
    return [];
  }

  return data;
}

export async function createDelivery(
  supabase: TypedSupabaseClient,
  userId: string,
  state: string,
  totalePrice: number,
  credentials: z.infer<typeof cashSchema>,
  name: string,
  email: string,
): Promise<Delivery> {
  const { data, error } = await supabase.from("delivery").insert([
    {
      user_id: userId,
      state,
      total_price: parseFloat(totalePrice.toFixed(2)),
      name,
      email,
      phone_number: credentials.phoneNumber,
      address: credentials.address,
    },
  ]).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
