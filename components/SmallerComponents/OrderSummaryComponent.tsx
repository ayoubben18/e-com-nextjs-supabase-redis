"use client";
import useTotalPriceStore from "@/stores/totalePriceStore";
import { CheckoutItemType } from "@/types/DtoTypes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import CheckoutButton from "./CheckoutButton";

interface Props {
  orders: CheckoutItemType[];
}

export default function OrderSummaryComponent({ orders }: Props) {
  const { totalPrice } = useTotalPriceStore();

  const shipping = 5;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>Subtotal</div>
          <div className="font-medium">$ {totalPrice}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Shipping</div>
          <div className="font-medium">$ {shipping}</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <div>Total</div>
          <div>$ {totalPrice + shipping}</div>
        </div>
      </CardContent>
      <CardFooter>
        <CheckoutButton totalPrice={totalPrice} empty={orders.length === 0} />
      </CardFooter>
    </Card>
  );
}
