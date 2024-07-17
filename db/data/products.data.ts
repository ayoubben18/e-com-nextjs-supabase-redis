"use server";
import { handleStatus } from "@/errors/handleStatus";
import { Products } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { createClient } from "@/utils/supabase/client";

export async function getProducts(
  supabase: TypedSupabaseClient,
  elementPerPage: number,
  page: number,
  rating: number = 0,
  topPrice: number,
) {
  const response = await supabase.from("products").select("*").order(
    "general_rating",
    { ascending: false },
  ).gt("general_rating", rating)
    .lte(
      "price",
      topPrice,
    )
    .range(
      (page - 1) * elementPerPage,
      page * elementPerPage - 1,
    );

  return response;
}

export async function getProductById(
  supabase: TypedSupabaseClient,
  id: string,
): Promise<Products | null> {
  const { data, error, status } = await supabase.from("products").select("*")
    .eq(
      "id",
      id,
    ).single();

  return handleStatus(error, status, data) as Products | null;
}

export async function updateGeneralRatingProduct(
  supabase: TypedSupabaseClient,
  rating: number,
): Promise<Products> {
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
  // supabase: TypedSupabaseClient,
  embedding: number[],
) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: "[" + embedding.toString() + "]", // pass the query embedding
    match_threshold: 0.80, // choose an appropriate threshold for your data
    match_count: 10, // choose the number of matches
  });

  if (error) {
    // throw new Error(error.message);
  }

  return data;
}

export async function findUniqueProducts(
  productsIds: string[],
  page: number,
  pageSize: number,
) {
  const supabase = createClient();
  const response = await supabase
    .from("products")
    .select("*")
    .in("id", productsIds)
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
}
