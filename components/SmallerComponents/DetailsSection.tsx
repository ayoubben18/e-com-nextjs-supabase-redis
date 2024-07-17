"use client";
import { createNewOrder } from "@/db/service/orders-service";
import { Delivery } from "@/enums/delivery.enum";
import useCartStore from "@/stores/cartStore";
import { useItemStore } from "@/stores/item.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import ColorSection from "../Filters/ColorSection";
import QuantitySection from "../Filters/QuantitySection";
import SizeSection from "../Filters/SizeSection";
import { Button } from "../ui/button";
import { Products } from "@/types/tablesTypes";

interface Props {
  product: Products;
}

export default function DetailsSection({ product }: Props) {
  if (!product) {
    return null;
  }

  const { color, size, quantity, setColor, setSize } = useItemStore();
  const { addItem } = useCartStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (product.colors && product.sizes) {
      setColor(product.colors[0]);
      setSize(product.sizes[0]);
    }
  }, []);

  const { isPending, mutate } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: createNewOrder,
    onError: (error) => {
      toast.error("Something went wrong !");
      queryClient.invalidateQueries({
        queryKey: ["checkout-items"],
      });
    },
    onSuccess: () => {
      addItem({
        id: product.id,
        price: product.price * quantity,
        quantity,
        color,
        size,
        status: Delivery.NotPlaced,
        user_id: "1",
        order_date: new Date().toISOString(),
        product_id: product.id,
        delivery_id: null,
        products: {
          name: product.name,
        },
      });
      toast.success("Product added to cart");
    },
  });

  return (
    <div className="grid items-start gap-4 md:gap-10">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold lg:text-4xl">{product.name} </h1>
        <div>
          <p>{product.description}</p>
        </div>
      </div>
      {product.colors && <ColorSection colors={product.colors} />}
      {product.sizes && <SizeSection sizes={product.sizes} />}
      <QuantitySection stock={product.stock} />
      <p className="text-2xl font-bold">
        ${(product.price * quantity).toFixed(2)}
      </p>
      <Button
        disabled={isPending}
        className="flex gap-2"
        size="lg"
        onClick={() =>
          mutate({
            productId: product.id,
            quantity,
            price: quantity * product.price,
            color,
            size,
          })
        }
      >
        {isPending && <div className="loader" />}Add to cart
      </Button>
    </div>
  );
}
