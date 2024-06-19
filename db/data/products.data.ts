"use server";

import { logger } from "@/logger/logger";
import { Database } from "@/types/database.types";
import { Product } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getProducts(
  // supabase: SupabaseClient<Database>,
  elementPerPage: number,
  page: number,
): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*").order(
    "general_rating",
    { ascending: false },
  ).range(page * elementPerPage, (page + 1) * elementPerPage - 1);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getProductById(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<Product> {
  const { data, error } = await supabase.from("products").select("*")
    .eq(
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

export async function findSimilarProduct(
  // supabase: SupabaseClient<Database>,
  embedding: number[],
) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: "[" + embedding.toString() + "]", // pass the query embedding
    match_threshold: 0.80, // choose an appropriate threshold for your data
    match_count: 10, // choose the number of matches
  });

  if (error) {
    console.log(error.message);

    // throw new Error(error.message);
  }

  return data;
}
