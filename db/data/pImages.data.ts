"use server";
import { Database } from "@/types/database.types";
import { ProductImage } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient();

export async function getProductImages(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<ProductImage[]> {
  const { data, error } = await supabase.from("products_images").select("*")
    .limit(5).eq(
      "product_id",
      id,
    );
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
