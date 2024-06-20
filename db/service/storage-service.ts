import { createClient } from "@/utils/supabase/client";
import { getAvatarUrl, uploadAvatar } from "../data/storage.data";
import { getUser } from "../data/users.data";

export async function uploadAvatarAndGetUrl(
  image: File,
) {
  // upload to avatar bucket
  const supabase = createClient();

  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  await uploadAvatar(image, user?.id);

  const imageUrl = await getAvatarUrl(user?.id);

  return imageUrl?.publicUrl;
}
