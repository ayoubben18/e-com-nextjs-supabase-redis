import { useItemStore } from "@/stores/item.store";
import { toast } from "sonner";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function QuantitySection({ stock }: { stock: number }) {
  const { setQuantity, quantity } = useItemStore();

  const handleChange = (quantity: string) => {
    let quantityNumber: number = 1;
    try {
      quantityNumber = parseInt(quantity);
    } catch (e) {
      toast.error("Please enter a valid quantity");
    }

    setQuantity(quantityNumber);
  };
  return (
    <div className="grid gap-2">
      <Label htmlFor="quantity" className="text-base">
        Quantity
      </Label>
      <div className="flex items-center gap-2">
        {/* <Button size="icon" variant="outline">
          <MinusIcon className="h-4 w-4" />
        </Button> */}
        <Select
          defaultValue={quantity.toString() || "1"}
          onValueChange={handleChange}
        >
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
        {/* <Button size="icon" variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button> */}
      </div>
    </div>
  );
}
