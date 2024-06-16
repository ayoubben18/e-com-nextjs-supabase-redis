import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function CommentInput() {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <form>
          <Input
            type="text"
            placeholder="Write a comment..."
            className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          />
        </form>
      </div>
      <Button type="submit" size="sm">
        Post
      </Button>
    </div>
  );
}
