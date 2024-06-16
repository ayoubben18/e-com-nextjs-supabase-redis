import DetailsSection from "./SmallerComponents/DetailsSection";
import { ImageSection } from "./SmallerComponents/ImageSection";

export default function ProductDetails() {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <ImageSection />
      <DetailsSection />
    </div>
  );
}
