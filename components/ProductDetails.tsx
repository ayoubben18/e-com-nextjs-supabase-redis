import { getAllProductDetails } from "@/db/service/product-service";
import { ImageSection } from "./SmallerComponents/ImageSection";
import DetailsSection from "./SmallerComponents/DetailsSection";

interface Props {
  id: string;
}

export default async function ProductDetails({ id }: Props) {
  const { details, images } = await getAllProductDetails(id);

  if (!details) {
    return <div>Product not found</div>;
  }
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <ImageSection images={images} />
      <DetailsSection product={details} />
    </div>
  );
}
