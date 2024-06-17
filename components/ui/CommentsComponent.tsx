"use client";
import { Comment } from "@/types/tablesTypes";
import CommentDetails from "../MappingCompenents/CommentDetails";
import CommentInput from "../SmallerComponents/CommentInput";
import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabaseClient";

interface Props {
  comments: Comment[];
}

export default function CommentsComponent({ comments }: Props) {
  const [commentArr, setCommentArr] = useState<Comment[]>(comments);
  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          setCommentArr((prev) => [...prev, payload.new as Comment]);
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);
  return (
    <div className="mx-auto w-full space-y-6 px-10">
      <CommentInput commentId={comments[0].product_id} />
      <div className="space-y-4">
        {commentArr ? (
          commentArr.map((com, index) => (
            <CommentDetails key={index} comment={com} />
          ))
        ) : (
          <h2>No comments</h2>
        )}
      </div>
    </div>
  );
}
