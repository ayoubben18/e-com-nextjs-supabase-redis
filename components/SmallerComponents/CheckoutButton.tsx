"use client";
import { checkout } from "@/db/service/orders-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  ordersIds: string[];
  totalPrice: number;
};

const CheckoutButton = ({ ordersIds, totalPrice }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: () =>
      checkout(
        // map orders to an array of their Ids
        totalPrice + 5,
      ),
    onSuccess: () => {
      toast.success("Order placed successfully !");
    },
    onError: () => {
      toast.error("Order failed to place");
    },
  });

  return (
    <Button
      className="w-full"
      onClick={() => mutate()}
      disabled={isPending || ordersIds.length === 0}
    >
      Place Order
    </Button>
  );
};

export default CheckoutButton;
