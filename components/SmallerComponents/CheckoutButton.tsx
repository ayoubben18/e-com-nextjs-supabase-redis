"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkout } from "@/db/service/orders-service";

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
        ordersIds,
        totalPrice,
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
      <Link href={`/checkout`}>Place Order</Link>
    </Button>
  );
};

export default CheckoutButton;
