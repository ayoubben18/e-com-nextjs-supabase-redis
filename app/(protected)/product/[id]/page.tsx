import PageWrapper from "@/components/PageWrapper";
import ProductDetails from "@/components/ProductDetails";
import CommentsComponent from "@/components/ui/CommentsComponent";
import { getProductCommentsService } from "@/db/service/comments-service";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const comments = await getProductCommentsService(params.id);
  return (
    <PageWrapper className="mb-16 gap-10">
      <ProductDetails id={params.id} />
      <CommentsComponent comments={comments || []} productId={params.id} />
    </PageWrapper>
  );
};

export default page;
