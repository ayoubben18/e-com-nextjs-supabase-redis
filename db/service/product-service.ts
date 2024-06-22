"use server";
import { Product } from "@/types/tablesTypes";
import {
  findSimilarProduct,
  getProductById,
  getProducts,
} from "../data/products.data";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@/utils/supabase/server";

export async function getAllProductDetails(
  id: string,
): Promise<{ details: Product | null; images: any[] }> {
  const supabase = createClient();

  const product = await getProductById(supabase, id);

  return {
    details: product,
    images: [],
  };
}

// export async function getInfiniteProducts(
//   { pageParam }: { pageParam: number },
// ): Promise<{ data: Product[]; currentPage: number; nextPage: number | null }> {
//   // const supabase = createClient();
//   const products = await getProducts(10, pageParam);

//   return {
//     data: products,
//     currentPage: pageParam,
//     nextPage: pageParam + 1,
//   };
// }

export async function embedTerm(value: string) {
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

  return Array.from(output.data);
}

export async function fetchProductsService(
  page: number,
  searchValue: string,
  rating: number | null,
  topPrice: number | null,
) {
  const supabase = createClient();
  let searchedProducts;
  const pageSize = 10;
  let products;
  let error;

  if (searchValue && searchValue.length > 3) {
    const embeddedValue = await embedTerm(searchValue);
    searchedProducts = await findSimilarProduct(
      embeddedValue,
    );

    if (searchedProducts) {
      if (rating) {
        searchedProducts = searchedProducts.filter(
          (product) => product.general_rating >= rating,
        );
      }

      products = searchedProducts;
    } else {
      error = "No products found";
    }
  } else {
    const { data, error: newError } = await getProducts(
      supabase,
      pageSize,
      page,
      rating || 0,
      topPrice || 9999999,
    );

    if (data) {
      products = data;
    }
    error = newError?.message;
  }

  if (error) {
    throw new Error(error);
  }

  return products;
}
