import { getAllProductDetails } from "@/db/service/product-service";
import { ImageSection } from "./SmallerComponents/ImageSection";
import DetailsSection from "./SmallerComponents/DetailsSection";
import { createClient } from "@/utils/supabase/server";

interface Props {
  id: string;
}

export default async function ProductDetails({ id }: Props) {
  const supabase = createClient();
  const { details, images } = await getAllProductDetails(supabase, id);
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <ImageSection images={images} />
      <DetailsSection product={details} />
    </div>
  );
}
