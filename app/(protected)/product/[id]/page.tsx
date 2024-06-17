import PageWrapper from "@/components/PageWrapper";
import ProductDetails from "@/components/ProductDetails";
import CommentsComponent from "@/components/ui/CommentsComponent";
import { getProductComments } from "@/db/data/comment.data";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const comments = await getProductComments(supabase, params.id);
  return (
    <PageWrapper className="mb-16 gap-10">
      <ProductDetails id={params.id} />
      <CommentsComponent comments={comments} />
    </PageWrapper>
  );
};

export default page;
