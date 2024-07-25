"use server";
import { redis } from "@/lib/redis";
import { createClient } from "@/utils/supabase/server";
import { pipeline } from "@xenova/transformers";
import {
  findSimilarProduct,
  getProductById,
  getProducts,
} from "../data/products.data";
import { Products } from "@/types/tablesTypes";
import { ECOMError } from "@/errors/ecommerce-error";
import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { ImageCache } from "@/types/ImageCache";
import { getProductImages } from "../data/products-images-data";
import { FullProductType } from "@/types/FullProductType";
import { logger } from "@/logger/logger";
import { ProductType } from "@/types/ProductType";

export const getProductService = async (
  id: string,
): Promise<ProductType | null> => {
  const product: Products | null = await redis.get(`product:${id}`);

  if (product) {
    const productImages: ImageCache[] | null = await redis.get(`images:${id}`);
    return { ...product, images: productImages || [] };
  }

  const supabase = createClient();
  const productData = await getProductById(supabase, id);

  if (!productData) return null;

  const images = await getProductImages(supabase, productData.id, 5);

  return {
    ...productData,
    images: images.map((image) => {
      return {
        name: image.full_path?.split("/").pop() || "",
        path: image.full_path,
        url: image.image_url,
      };
    }),
  };
};

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
  itemsPerPage: number,
  searchValue: string,
  rating: number | null,
  topPrice: number | undefined,
): Promise<FullProductType[]> {
  const supabase = createClient();
  let searchedProducts;
  const pageSize = itemsPerPage;

  const fetchFromDatabase = async () => {
    const productsWithImages = [];
    const products = await getProducts(
      supabase,
      pageSize,
      page,
      rating || 0,
      topPrice || 9999999,
    );

    for (const product of products) {
      const image = await getProductImages(supabase, product.id, 1);

      if (image.length !== 0) {
        productsWithImages.push({ ...product, imageUrl: image[0].image_url });
      } else productsWithImages.push({ ...product, imageUrl: null });
    }

    return productsWithImages;
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

      const products: Products[] = await redis.mget(productIds as string[]);
      const productsImagesKeys = products.map(
        (product) => `images:${product.id}`,
      );
      const productsImages: ImageCache[][] = await redis.mget(
        productsImagesKeys,
      );

      const productsWithImages = products.map((product, index) => {
        const imageUrl = productsImages[index]?.[0]?.url;

        return { ...product, imageUrl };
      });

      return productsWithImages;
    } catch (err) {
      throw new ECOMError("products not found", ECOMErrorEnum.RedisError, 500);
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
      if (topPrice) {
        searchedProducts = searchedProducts.filter(
          (product) => product.price <= topPrice,
        );
      }

      let productsWithImages = [];

      for (const product of searchedProducts) {
        const image = await getProductImages(supabase, product.id, 1);

        if (image.length !== 0) {
          productsWithImages.push({ ...product, imageUrl: image[0].image_url });
        } else productsWithImages.push({ ...product, imageUrl: null });
      }

      return productsWithImages;
    }
  }
  // get the values that has keys starting with product:* from redis
  if (!rating && !topPrice) {
    const products = await fetchFromRedis();
    if (products) {
      logger.info("Products fetched from Redis");
      return products;
    }
    logger.info("Products fetched from Supabase");
    return await fetchFromDatabase();
  }
  return await fetchFromDatabase();
}
