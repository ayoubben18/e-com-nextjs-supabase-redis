import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function RatingFilter() {
  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Rating</h3>
      <div className="grid gap-2">
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="rating-4-5" /> 4 stars and above
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="rating-3-5" /> 3 stars and above
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="rating-2-5" /> 2 stars and above
        </Label>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox id="rating-1-5" /> 1 star and above
        </Label>
      </div>
    </div>
  );
}
