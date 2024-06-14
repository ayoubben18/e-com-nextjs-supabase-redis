import { XIcon } from "@/svgs";
import { Button } from "../ui/button";

export default function ItemCard() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/product.webp"
        width="64"
        height="64"
        alt="Product image"
        className="aspect-square rounded-md object-cover"
      />
      <div className="flex-1">
        <div className="font-medium">Acme Prism T-Shirt</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Size: M, Color: Black
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">$49.99</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Qty: 1</div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
}
