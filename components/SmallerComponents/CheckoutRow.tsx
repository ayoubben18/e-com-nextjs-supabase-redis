"use client";
import useDeletionStore from "@/stores/deletionStore";
import { CheckoutItemType } from "@/types/DtoTypes";
import ItemCard from "../MappingCompenents/ItemCard";
import { useQuery } from "@tanstack/react-query";
import useCartStore from "@/stores/cartStore";
import { getCheckoutItems } from "@/db/service/orders-service";
import { useEffect } from "react";
import useTotalPriceStore from "@/stores/totalePriceStore";
import { getTotlaePrice } from "@/lib/calculations/getTotalePrice";

interface Props {
  checkoutItems: CheckoutItemType[];
}

const CheckoutRow = ({ checkoutItems }: Props) => {
  const { item } = useDeletionStore();
  const { item: cartItem } = useCartStore();
  const { setPrice } = useTotalPriceStore();

  const { data, isLoading } = useQuery({
    queryKey: ["checkout-items", item, cartItem],
    queryFn: async () => getCheckoutItems(),
    initialData: checkoutItems,
    refetchInterval: 750,
  });

  useEffect(() => {
    setPrice(Number(getTotlaePrice(data).toFixed(2)));
  }, [data]);

  console.log(data, isLoading);

  // useEffect(() => {
  //   if (item) {
  //     setItem((prev) => prev.filter((i) => i.id !== item));
  //   }
  // }, [item]);

  return (
    <div className="grid gap-4">
      {data.map((item, i) => (
        <ItemCard CheckoutItem={item} key={i} />
      ))}
    </div>
  );
};

export default CheckoutRow;
