"use client";
import { deleteOrder } from "@/db/service/orders-service";
import { XIcon } from "@/svgs";
import { CheckoutItemType } from "@/types/DtoTypes";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useDeletionStore from "@/stores/deletionStore";

interface Props {
  CheckoutItem: CheckoutItemType;
}

export default function ItemCard({ CheckoutItem }: Props) {
  const { setItem } = useDeletionStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: () => deleteOrder(CheckoutItem.id),
    onMutate: () => {
      setItem(CheckoutItem.id);
    },
    onError: (error) => {
      toast.error("Something went wrong !");
    },
    onSuccess: () => {
      toast.success("Product deleted from cart");
    },
  });

  return (
    <div className="flex items-center gap-4">
      <Image
        priority
        src="/product.webp"
        width="64"
        height="64"
        alt="Product image"
        className="aspect-square rounded-md object-cover"
      />
      <div className="flex-1">
        <div className="font-medium">{CheckoutItem.products.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Size: {CheckoutItem.size}, Color: {CheckoutItem.color}
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">$ {CheckoutItem.price}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Qty: {CheckoutItem.quantity}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => mutate()}
        disabled={isPending}
      >
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
}
