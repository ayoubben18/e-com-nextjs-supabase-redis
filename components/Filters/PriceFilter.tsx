import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function PriceFilter() {
  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Price Range</h3>
      <div className="grid gap-2">
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="price-0-50" /> $0 - $50
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="price-50-100" /> $50 - $100
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="price-100-200" /> $100 - $200
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="price-200+" /> $200+
        </Label>
      </div>
    </div>
  );
}
