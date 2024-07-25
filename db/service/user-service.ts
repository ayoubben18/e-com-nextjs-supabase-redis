"use server";

import { createClient } from "@/utils/supabase/server";
import { getMappedUser, mapUser, updateUser } from "../data/mapped-users-data";

const mappedUserService = async (id: string, email: string, name: string) => {
  const supabase = createClient();
  const user = await getMappedUser(supabase, email, id);

  if (user) {
    await updateUser(supabase, id, name);
  } else {
    await mapUser(supabase, id, email, name);
  }
};

export { mappedUserService };
