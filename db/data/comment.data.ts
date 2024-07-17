"use server";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { handleStatus } from "@/errors/handleStatus";
import { createClient } from "@/utils/supabase/server";
import { Comments } from "@/types/tablesTypes";
import { authenticatedAction } from "@/actions/authenticatedActions";
import { z } from "zod";

const getProductComments = async (
  supabase: TypedSupabaseClient,
  id: string,
) => {
  const { data, error, status } = await supabase.from("comments").select("*")
    .eq(
      "product_id",
      id,
    );

  return handleStatus(error, status, data) as Comments[] | null;
};

const createComment = authenticatedAction.schema(
  z.object({
    description: z.string(),
    productId: z.string().uuid(),
  }),
).action(
  async ({ ctx: { userId }, parsedInput: { description, productId } }) => {
    const supabase = createClient();

    const { error, status, data } = await supabase.from("comments").insert([
      {
        description: description,
        user_id: userId,
        product_id: productId,
      },
    ]).select("*").single();

    return handleStatus(error, status, data) as Comments | null;
  },
);

export { createComment, getProductComments };
