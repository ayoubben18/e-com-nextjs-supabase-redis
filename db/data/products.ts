"use server";

import { logger } from "@/logger/logger";
import { Database } from "@/types/database.types";
import { Product } from "@/types/tablesTypes";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getProducts(
  supabase: SupabaseClient<Database>,
): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").order(
    "general_rating",
    { ascending: false },
  );
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getProductById(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<Product> {
  const { data, error } = await supabase.from("products").select("*").eq(
    "id",
    id,
  ).single();
  if (error) {
    logger.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateGeneralRatingProduct(
  supabase: SupabaseClient<Database>,
  rating: number,
): Promise<Product> {
  const { data, error } = await supabase.from("products").update({
    general_rating: rating,
  })
    .select(
      "*",
    ).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
