import { Product } from "@/types/tablesTypes";
import {
  findSimilarProduct,
  getProductById,
  getProducts,
} from "../data/products.data";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { pipeline } from "@xenova/transformers";

export async function getAllProductDetails(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<{ details: Product; images: any[] }> {
  const product = await getProductById(supabase, id);
  return {
    details: product,
    images: [],
  };
}

export async function getInfiniteProducts(
  { pageParam }: { pageParam: number },
): Promise<{ data: Product[]; currentPage: number; nextPage: number | null }> {
  // const supabase = createClient();
  const products = await getProducts(10, pageParam);

  return {
    data: products,
    currentPage: pageParam,
    nextPage: pageParam + 1,
  };
}

export async function embedAndSearch(value: string) {
  const pipe = await pipeline(
    "feature-extraction",
    "Supabase/gte-small",
  );

  // Generate the embedding from text
  const output = await pipe(value, {
    pooling: "mean",
    normalize: true,
  });
  console.log(Array.from(output.data));

  const searchedProducts = await findSimilarProduct(
    Array.from(output.data),
  );

  console.log("searched :", searchedProducts);

  if (!searchedProducts) {
    return [];
  }

  return searchedProducts;
  // Extract the embedding output

  // console.log(output);
}
