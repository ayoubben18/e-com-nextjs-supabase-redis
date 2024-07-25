"use sever";

import { handleStatus } from "@/errors/handleStatus";
import { ProductImages } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";

const insertProductImage = async (
  supabase: TypedSupabaseClient,
  images: Omit<ProductImages, "id" | "created_at" | "image_url">[],
) => {
  const { data, status, error } = await supabase
    .from("products_images")
    .insert(images)
    .select("*");

  return handleStatus(error, status, data) as ProductImages[];
};

const getProductImages = async (
  supabase: TypedSupabaseClient,
  productId: string,
  limit: number = 5,
) => {
  const { data, status, error } = await supabase
    .from("products_images")
    .select("*")
    .eq("product_id", productId)
    .limit(limit);

  return handleStatus(error, status, data) as ProductImages[];
};
const deleteProductImages = async (
  supabase: TypedSupabaseClient,
  productId: string,
) => {
  const { status, error } = await supabase
    .from("products_images")
    .delete()
    .eq("product_id", productId);

  return handleStatus(error, status, null) as null;
};

export { deleteProductImages, getProductImages, insertProductImage };
