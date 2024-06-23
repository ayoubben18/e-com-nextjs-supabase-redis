"use server";
import { Product } from "@/types/tablesTypes";
import {
  findSimilarProduct,
  getProductById,
  getProducts,
} from "../data/products.data";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@/utils/supabase/server";
import { redis } from "@/lib/redis";
import { count, log } from "console";

export async function getAllProductDetails(
  id: string,
): Promise<{ details: Product | null; images: any[] }> {
  let product;
  const redisProduct = await redis.get(`product:${id}`);
  if (redisProduct) {
    product = redisProduct as unknown as Product;
  } else {
    const supabase = createClient();
    product = await getProductById(supabase, id);
  }

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

  return Array.from(output.data);
}

export async function fetchProductsService(
  page: number,
  searchValue: string,
  rating: number | null,
  topPrice: number | undefined,
) {
  const supabase = createClient();
  let searchedProducts;
  const pageSize = 10;
  let products;
  let error;

  const fetchFromDatabase = async () => {
    const { data, error: dbError } = await getProducts(
      supabase,
      pageSize,
      page,
      rating || 0,
      topPrice || 9999999,
    );

    if (dbError) {
      throw new Error(dbError.message);
    }

    return data;
  };

  async function fetchFromRedis() {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    try {
      const productIds = await redis.zrange("products_by_rating", start, end, {
        rev: true,
      });

      if (productIds.length === 0) {
        return null; // No products found in Redis
      }

      // convert the ids to format product:{id}

      // const productIdsWithPrefix = productIds.map((id) => `product:${id}`);
      // const products = [];
      // for (const id of productIds) {
      //   const product = await redis.hgetall(`product:${id}`);
      //   products.push(product);
      // }
      // const newproducts = await redis.mget(productIdsWithPrefix);
      // console.log(productIdsWithPrefix[0], productIdsWithPrefix[2]);

      products = await redis.mget(productIds as string[]);
      console.log(products[0], "products");

      return products as unknown as Product[];
    } catch (err) {
      return null;
    }
  }

  if (searchValue && searchValue.length >= 3) {
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
    // get the values that has keys starting with product:* from redis
    if (!rating && !topPrice) {
      products = await fetchFromRedis();
    }

    if (!products || products.length === 0) {
      products = await fetchFromDatabase();
    }
  }

  if (error) {
    throw new Error(error);
  }

  return products;
}
