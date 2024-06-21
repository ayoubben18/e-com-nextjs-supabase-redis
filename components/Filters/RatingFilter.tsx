"use client";
import { useFilterStore } from "@/stores/filterStore";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const rates = ["4", "3", "2", "1", "0"];

export default function RatingFilter() {
  const { setRating } = useFilterStore();
  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Rating</h3>
      <RadioGroup
        id="rating"
        defaultValue={"0"}
        className="grid gap-2"
        onValueChange={(value) => setRating(parseInt(value))}
      >
        {rates.map((rate, index) => (
          <Label className="flex items-center gap-2 font-normal" key={index}>
            <RadioGroupItem value={rate} id={`rating ${rate}`} /> {rate} stars
            and above
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
