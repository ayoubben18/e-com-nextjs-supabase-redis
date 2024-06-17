import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  colors: string[];
}

export default function ColorSection({ colors }: Props) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="color" className="text-base">
        Color
      </Label>
      <RadioGroup
        id="color"
        defaultValue="black"
        className="flex items-center gap-2"
      >
        {colors.map((color) => (
          <Label
            htmlFor="color-black"
            className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
          >
            <RadioGroupItem id="color-black" value={color} />
            {color[0].toUpperCase() + color.split("").slice(1).join("")}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
