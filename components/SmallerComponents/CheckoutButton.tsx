"use client";
import { checkout } from "@/db/service/orders-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  empty: boolean;
  totalPrice: number;
};

const CheckoutButton = ({ empty, totalPrice }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: () =>
      checkout(
        // map orders to an array of their Ids
        totalPrice + 5,
      ),
    onSuccess: () => {
      toast.success("Order placed successfully !");
      // new Promise((resolve) => setTimeout(resolve, 500));
      queryClient.invalidateQueries({
        queryKey: ["checkout-items"],
      });
    },
    onError: () => {
      toast.error("Order failed to place");
    },
  });

  return (
    <Button
      className="w-full"
      onClick={() => mutate()}
      disabled={isPending || empty}
    >
      Place Order
    </Button>
  );
};

export default CheckoutButton;
