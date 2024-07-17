"use server";

import { redis } from "@/lib/redis";
import { createClient } from "@/utils/supabase/server";
import { getProductComments } from "../data/comment.data";
import { serverActionClient } from "@/actions/authenticatedActions";
import { z } from "zod";
import { Comments } from "@/types/tablesTypes";

const getProductCommentsService = serverActionClient.schema(
  z.object({
    productId: z.string().uuid(),
  }),
).action(
  async ({ parsedInput: { productId } }) => {
    const redisComments = await redis.get(`comments:${productId}`);
    if (redisComments) {
      return redisComments as Comments[];
    }
    const supabase = createClient();
    const comments = await getProductComments(supabase, productId);

    return comments;
  },
);

export { getProductCommentsService };
