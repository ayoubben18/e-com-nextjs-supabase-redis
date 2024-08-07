"use client";
import CommentDetails from "../MappingCompenents/CommentDetails";
import CommentInput from "../SmallerComponents/CommentInput";
import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabaseClient";
import { Comments } from "@/types/tablesTypes";

interface Props {
  comments: Comments[];
  productId: string;
}

export default function CommentsComponent({ productId, comments }: Props) {
  const [commentArr, setCommentArr] = useState<Comments[]>(comments);
  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          setCommentArr((prev) => [...prev, payload.new as Comments]);
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [supabaseClient, commentArr, setCommentArr]);
  return (
    <div className="mx-auto w-full space-y-6 px-10">
      <CommentInput productId={productId} />
      <div className="space-y-4">
        {commentArr.length !== 0 ? (
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
