import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/db/data/users.data";

export default async function ProfileCard() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>
          <Image
            alt="user"
            src={user?.user_metadata.avatar_url}
            width="100"
            height="100"
          />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">{user.user_metadata.name}</h2>
        <h2 className="text-md font-medium">{user.email}</h2>
      </div>
    </div>
  );
}
