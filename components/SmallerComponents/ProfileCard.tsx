import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/db/data/users.data";

export default async function ProfileCard() {
  // const [open, setOpen] = useState(false);
  // const { image, setImage } = useImagetore();

  // const uploadImage = async (file: File[]) => {
  //   const imageUrl = await uploadAvatarAndGetUrl(file[0]);
  //   console.log(imageUrl);
  //   if (!imageUrl) return;
  //   setImage(imageUrl);
  // };

  // async function getUserWithImage() {
  //   const supabase = createClient();
  //   const user = await getUser(supabase);

  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   setImage(user.user_metadata.avatar_url);
  // }

  // useEffect(() => {
  //   getUserWithImage();
  // }, []);
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
      {/* {open ? ( */}
      {/* <FileUploadCard setOpen={setOpen} onUpload={uploadImage} /> */}
      {/* ) : ( */}
      {/* <Button onClick={() => setOpen((prev) => !prev)}>Change Photo</Button> */}
      {/* )} */}
    </div>
  );
}
