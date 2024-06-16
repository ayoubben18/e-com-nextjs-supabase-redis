import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function SizeSection() {
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
        <Label
          htmlFor="size-xs"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="size-xs" value="xs" />
          XS
        </Label>
        <Label
          htmlFor="size-s"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="size-s" value="s" />S
        </Label>
        <Label
          htmlFor="size-m"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="size-m" value="m" />M
        </Label>
        <Label
          htmlFor="size-l"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="size-l" value="l" />L
        </Label>
        <Label
          htmlFor="size-xl"
          className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
        >
          <RadioGroupItem id="size-xl" value="xl" />
          XL
        </Label>
      </RadioGroup>
    </div>
  );
}
