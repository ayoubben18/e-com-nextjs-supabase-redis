"use client";
import { createNewOrder } from "@/db/service/orders-service";
import { useItemStore } from "@/stores/item.store";
import { Product } from "@/types/tablesTypes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ColorSection from "../Filters/ColorSection";
import QuantitySection from "../Filters/QuantitySection";
import SizeSection from "../Filters/SizeSection";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface Props {
  product: Product;
}

export default function DetailsSection({ product }: Props) {
  if (!product) {
    return null;
  }

  const { color, size, quantity, setColor, setSize } = useItemStore();
  useEffect(() => {
    if (product.colors && product.sizes) {
      setColor(product.colors[0]);
      setSize(product.sizes[0]);
    }
  }, []);

  const { isPending, mutate } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: () => createNewOrder(product.id, quantity, color, size),
    onError: (error) => {
      toast.error("Something went wrong !");
    },
    onSuccess: () => {
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
      <Button disabled={isPending} size="lg" onClick={() => mutate()}>
        Add to cart
      </Button>
    </div>
  );
}
