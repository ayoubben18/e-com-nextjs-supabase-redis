import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface Props {
  totalPrice: number;
}

export default function OrderSummaryComponent({ totalPrice }: Props) {
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
        <Button className="w-full">Place Order</Button>
      </CardFooter>
    </Card>
  );
}
