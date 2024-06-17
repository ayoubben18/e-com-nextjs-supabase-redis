import { Product } from "@/types/tablesTypes";
import ColorSection from "../Filters/ColorSection";
import QuantitySection from "../Filters/QuantitySection";
import SizeSection from "../Filters/SizeSection";
import { Button } from "../ui/button";

interface Props {
  product: Product;
}

export default function DetailsSection({ product }: Props) {
  if (!product) {
    return null;
  }
  return (
    <div className="grid items-start gap-4 md:gap-10">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold lg:text-4xl">{product.name} </h1>
        <div>
          <p>{product.description}</p>
        </div>
      </div>
      <form className="grid gap-4 md:gap-10">
        <ColorSection colors={product.colors} />
        <SizeSection sizes={product.sizes} />
        <QuantitySection />
        <Button size="lg">Add to cart</Button>
      </form>
    </div>
  );
}
