import { CheckIcon } from "@/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">John Doe</h2>
        <h2 className="text-xl font-medium">test@gmail.com</h2>
        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          <CheckIcon className="h-4 w-4" />
          Seller
        </div>
      </div>
    </div>
  );
}
