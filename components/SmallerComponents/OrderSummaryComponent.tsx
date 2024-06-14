import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export default function OrderSummaryComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>Subtotal</div>
          <div className="font-medium">$72.97</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Shipping</div>
          <div className="font-medium">$5.00</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <div>Total</div>
          <div>$77.97</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Place Order</Button>
      </CardFooter>
    </Card>
  );
}
