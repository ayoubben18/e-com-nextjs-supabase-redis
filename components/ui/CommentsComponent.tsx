import CommentDetails from "../MappingCompenents/CommentDetails";
import CommentInput from "../SmallerComponents/CommentInput";

export default function CommentsComponent() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <CommentInput />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <CommentDetails key={i} />
        ))}
      </div>
    </div>
  );
}
