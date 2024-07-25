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

  const { data } = useQuery({
    queryKey: ["checkout-items", item, cartItem],
    queryFn: async () => {
      //@ts-ignore
      const items = await getCheckoutItems();

      if (!items) return [];
      return items.data ? items.data : [];
    },
    initialData: checkoutItems,
  });

  useEffect(() => {
    setPrice(Number(getTotlaePrice(data).toFixed(2)));
  }, [data]);

  // useEffect(() => {
  //   if (item) {
  //     setItem((prev) => prev.filter((i) => i.id !== item));
  //   }
  // }, [item]);

  return (
    <div className="grid gap-4">
      {data.length === 0 ? (
        <div className="text-center">No items in the cart</div>
      ) : (
        data.map((item, i) => <ItemCard CheckoutItem={item} key={i} />)
      )}
    </div>
  );
};

export default CheckoutRow;
