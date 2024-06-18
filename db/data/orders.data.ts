"use server ";

import { Database } from "@/types/database.types";
import { Order, OrderStatus } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

export async function getOrders(
  supabase: SupabaseClient<Database>,
  userId: string,
  status: OrderStatus,
): Promise<Order[]> {
  const { data, error } = await supabase.from("orders").select("*").eq(
    "user_id",
    userId,
  ).eq("status", status);

  if (error) {
    // throw new Error(error.message);
    return [];
  }

  return data;
}

export async function createOrder(
  supabase: SupabaseClient<Database>,
  userId: string,
  productId: string,
  quantity: number,
  color?: string | null,
  size?: string | null,
): Promise<Order> {
  const { data, error } = await supabase.from("orders").insert([
    {
      product_id: productId,
      user_id: userId,
      quantity,
      color: color || null,
      size: size || null,
    },
  ]).select("*").single();

  if (error) {
    console.log(error.message);

    throw new Error(error.message);
  }

  return data;
}

export async function removeOrderById(
  supabase: SupabaseClient<Database>,
  orderId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase.from("orders").delete().eq("id", orderId).eq(
    "user_id",
    userId,
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateOrderQuatity(
  supabase: SupabaseClient<Database>,
  newQuatity: number,
  orderId: string,
): Promise<Order> {
  const { data, error } = await supabase.from("orders").update({
    quantity: newQuatity,
  }).eq("id", orderId).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
