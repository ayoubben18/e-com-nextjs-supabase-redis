import { Product } from "@/types/tablesTypes";
import { getProductById } from "../data/products";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getAllProductDetails(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<{ details: Product; images: any[] }> {
  const product = await getProductById(supabase, id);
  //   const productImages =
  return {
    details: product,
    images: [],
  };
}
