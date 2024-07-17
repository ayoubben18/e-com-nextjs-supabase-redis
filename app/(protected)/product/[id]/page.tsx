import PageWrapper from "@/components/PageWrapper";
import ProductDetails from "@/components/ProductDetails";
import CommentsComponent from "@/components/ui/CommentsComponent";
import { getProductCommentsService } from "@/db/service/comments-service";

const page = async ({ params }: { params: { id: string } }) => {
  const comments = await getProductCommentsService({
    productId: params.id,
  });
  return (
    <PageWrapper className="mb-16 gap-10">
      <ProductDetails id={params.id} />
      <CommentsComponent
        comments={comments?.data || []}
        productId={params.id}
      />
    </PageWrapper>
  );
};

export default page;
