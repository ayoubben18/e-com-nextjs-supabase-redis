// "use server";

import { createClient } from "@/utils/supabase/client";

export async function uploadAvatar(image: File, userId: string) {
  // upload to avatar bucket
  const supabase = createClient();
  const { data, error } = await supabase
    .storage
    .from("avatars")
    .upload(`${userId}/latest`, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getAvatarUrl(userId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .storage
    .from("avatars")
    .getPublicUrl(`${userId}/latest`);

  if (!data) {
    return null;
  }

  return data;
}
