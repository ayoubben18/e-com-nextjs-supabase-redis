import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function QuantitySection() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="quantity" className="text-base">
        Quantity
      </Label>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Select defaultValue="1">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
        <Button size="icon" variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
