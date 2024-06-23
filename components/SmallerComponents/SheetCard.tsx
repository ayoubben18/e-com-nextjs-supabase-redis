import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCheckoutItems } from "@/db/service/orders-service";
import { ShoppingCartIcon } from "@/svgs";
import SheetFooterMoney from "../MappingCompenents/SheetFooterMoney";
import { Button } from "../ui/button";
import CheckoutRow from "./CheckoutRow";

export default async function SheetCard() {
  // we use because cookies are not accessible with unstable cahe
  const checkoutItems = await getCheckoutItems();

  return (
    <Sheet>
      <SheetTitle className="hidden">Cart</SheetTitle>
      <SheetDescription className="hidden">Your shopping cart</SheetDescription>
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
      <SheetClose />
      <SheetContent side="right" className="w-[400px] max-w-full">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-lg font-medium">Cart</h3>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid gap-4">
              <CheckoutRow checkoutItems={checkoutItems} />
            </div>
          </div>
          <SheetFooterMoney />
        </div>
      </SheetContent>
    </Sheet>
  );
}
