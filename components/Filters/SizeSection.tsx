import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  sizes: string[];
}

export default function SizeSection({ sizes }: Props) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="size" className="text-base">
        Size
      </Label>
      <RadioGroup
        id="size"
        defaultValue="m"
        className="flex items-center gap-2"
      >
        {sizes.map((size) => (
          <Label
            key={size}
            htmlFor="size-xs"
            className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
          >
            <RadioGroupItem id="size-xs" value={size} />
            {size}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
