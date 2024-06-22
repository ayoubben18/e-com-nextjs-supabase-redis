import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCheckoutItems } from "@/db/service/orders-service";
import { getTotlaePrice } from "@/lib/calculations/getTotalePrice";
import { ShoppingCartIcon } from "@/svgs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import CheckoutRow from "./CheckoutRow";

export default async function SheetCard() {
  // we use because cookies are not accessible with unstable cahe
  const cookieStore = cookies();
  const checkoutItems = await getCheckoutItems(cookieStore);

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
          <div className="border-t px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">Total</div>
              <div className="text-lg font-medium">
                $ {getTotlaePrice(checkoutItems).toFixed(2)}
              </div>
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
