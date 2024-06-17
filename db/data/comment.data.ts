"use server";

import { Database } from "@/types/database.types";
import { Comment } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUserId } from "./users.data";

export async function getProductComments(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<Comment[]> {
  const { data, error } = await supabase.from("comments").select("*").eq(
    "product_id",
    id,
  );
  if (error) {
    return [];
  }
  return data;
}

export async function createComment(
  description: string,
  product_id: string,
): Promise<void> {
  const supabase = createClient();
  const user = await getUserId(supabase);
  if (!user) {
    throw new Error("You are not connected !");
  }
  const { error } = await supabase.from("comments").insert([
    {
      description: description,
      user_id: user.id,
      product_id: product_id,
    },
  ]);
  if (error) {
    throw new Error(error.message);
  }
}
