import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CategoryFilter() {
  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Category</h3>
      <div className="grid gap-2">
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="category-clothing" /> Clothing
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="category-electronics" /> Electronics
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="category-home" /> Home
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="category-beauty" /> Beauty
        </Label>
      </div>
    </div>
  );
}
