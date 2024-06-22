"use server";
import { Comment } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { getUser } from "./users.data";
import { handleStatus } from "@/errors/handleStatus";
import { createClient } from "@/utils/supabase/client";

export async function getProductComments(
  supabase: TypedSupabaseClient,
  id: string,
): Promise<Comment[] | null> {
  const { data, status } = await supabase.from("comments").select("*").eq(
    "product_id",
    id,
  );
  return handleStatus(status, data) as Comment[] | null;
}

export async function createComment(
  description: string,
  product_id: string,
): Promise<void> {
  const supabase = createClient();
  const user = await getUser(supabase);
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
