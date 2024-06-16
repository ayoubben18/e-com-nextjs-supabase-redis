import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CommentDetails() {
  return (
    <div className="flex items-start space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">John Doe</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            2 hours ago
          </div>
        </div>
        <p>
          This is a great feature! I love how easy it is to use and the
          customization options are really impressive.
        </p>
      </div>
    </div>
  );
}
