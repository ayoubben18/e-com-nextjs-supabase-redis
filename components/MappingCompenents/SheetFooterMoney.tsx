"use client";

import useTotalPriceStore from "@/stores/totalePriceStore";
import RouterButton from "../SmallerComponents/RouterButton";

export default function SheetFooterMoney() {
  const { totalPrice } = useTotalPriceStore();
  return (
    <div className="border-t px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Total</div>
        <div className="text-lg font-medium">$ {totalPrice}</div>
      </div>
      <RouterButton route="/checkout" label="Checkout" />
    </div>
  );
}
