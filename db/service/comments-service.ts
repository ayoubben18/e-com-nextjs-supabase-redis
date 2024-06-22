"use server";

import { redis } from "@/lib/redis";
import { createClient } from "@/utils/supabase/server";
import { getProductComments } from "../data/comment.data";
import { Comment } from "@/types/tablesTypes";

export async function getProductCommentsService(productId: string) {
  const redisComments = await redis.get(`comments:${productId}`);
  if (redisComments) {
    return redisComments as Comment[];
  }
  const supabase = createClient();
  const comments = await getProductComments(supabase, productId);

  return comments;
}
