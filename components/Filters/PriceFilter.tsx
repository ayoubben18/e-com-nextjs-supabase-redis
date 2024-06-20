"use client";
import { useFilterStore } from "@/stores/filterStore";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const prices = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
];

export default function PriceFilter() {
  const { setTopPrice } = useFilterStore();

  return (
    <div>
      <h3 className="mb-2 text-base font-medium">Rating</h3>
      <RadioGroup
        id="rating"
        defaultValue={"9999999"}
        className="grid gap-2"
        onValueChange={(value) => setTopPrice(parseInt(value))}
      >
        {prices.map((price) => (
          <Label className="flex items-center gap-2 font-normal">
            <RadioGroupItem value={price} id={`rating ${price}`} /> {price}$ and
            below
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
