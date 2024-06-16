import PageWrapper from "@/components/PageWrapper";
import ProductDetails from "@/components/ProductDetails";
import CommentsComponent from "@/components/ui/CommentsComponent";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <PageWrapper className="mb-16 gap-10">
      <ProductDetails />
      <CommentsComponent />
    </PageWrapper>
  );
};

export default page;
