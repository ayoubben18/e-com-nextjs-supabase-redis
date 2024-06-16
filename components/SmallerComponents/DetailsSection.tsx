import ColorSection from "../Filters/ColorSection";
import QuantitySection from "../Filters/QuantitySection";
import SizeSection from "../Filters/SizeSection";
import { Button } from "../ui/button";

export default function DetailsSection() {
  return (
    <div className="grid items-start gap-4 md:gap-10">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold lg:text-4xl">
          CottonSculpt Prism Tee: The Cozy Chromatic Blend
        </h1>
        <div>
          <p>
            60% combed ringspun cotton/40% polyester jersey tee. Introducing the
            Acme Prism T-Shirt, a perfect blend of style and comfort for the
            modern individual.
          </p>
        </div>
      </div>
      <form className="grid gap-4 md:gap-10">
        <ColorSection />
        <SizeSection />
        <QuantitySection />
        <Button size="lg">Add to cart</Button>
      </form>
    </div>
  );
}
