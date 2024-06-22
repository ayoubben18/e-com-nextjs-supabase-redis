import { Comment } from "@/types/tablesTypes";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  comment: Comment;
}

export default function CommentDetails({ comment }: Props) {
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
            {comment.created_at &&
              formatDistance(new Date(comment.created_at), new Date(), {
                addSuffix: true,
              })}
          </div>
        </div>
        <p>{comment.description}</p>
      </div>
    </div>
  );
}
