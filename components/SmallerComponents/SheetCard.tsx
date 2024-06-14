import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCartIcon, XIcon } from "@/svgs";
import Link from "next/link";
import ItemCard from "../MappingCompenents/ItemCard";

export default function SheetCard() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] max-w-full">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-lg font-medium">Cart</h3>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid gap-4">
              <ItemCard />
            </div>
          </div>
          <div className="border-t px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">Total</div>
              <div className="text-lg font-medium">$99.98</div>
            </div>
            <Button className="mt-2 w-full">
              <Link href={`/checkout`}>Checkout</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
