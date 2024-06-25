"use client";
import { checkout } from "@/db/service/orders-service";
import useCashStore from "@/stores/cashStore";
import useTotalPriceStore from "@/stores/totalePriceStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  empty: boolean;
  totalPrice: number;
};

const CheckoutButton = ({ empty, totalPrice }: Props) => {
  const queryClient = useQueryClient();
  const { setPrice } = useTotalPriceStore();
  const { credentials, reset } = useCashStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      // checkk for the credentials using zod validation
      if (
        credentials.name === "" ||
        credentials.email === "" ||
        credentials.phoneNumber === "" ||
        credentials.address === ""
      ) {
        toast.error("Please fill all the fields");
        throw new Error("Please fill all the fields");
      }
      await checkout(totalPrice + 5, credentials);
    },
    onSuccess: () => {
      toast.success("Order placed successfully !");
      queryClient.invalidateQueries({
        queryKey: ["checkout-items"],
      });
      setPrice(0);
      reset();
    },
    onError: () => {
      toast.error("Order failed to place");
    },
  });

  return (
    <Button
      variant="ringHover"
      className="flex w-full gap-2"
      onClick={() => mutate()}
      disabled={isPending || empty}
    >
      {isPending && <div className="loader" />} Place Order
    </Button>
  );
};

export default CheckoutButton;
