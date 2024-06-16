import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function ColorSection() {
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
        <Label
          htmlFor="color-black"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="color-black" value="black" />
          Black
        </Label>
        <Label
          htmlFor="color-white"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="color-white" value="white" />
          White
        </Label>
        <Label
          htmlFor="color-blue"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="color-blue" value="blue" />
          Blue
        </Label>
      </RadioGroup>
    </div>
  );
}
