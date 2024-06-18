"use client";
import { CheckoutItemType } from "@/types/DtoTypes";
import { useEffect, useState } from "react";
import ItemCard from "../MappingCompenents/ItemCard";
import useDeletionStore from "@/stores/deletionStore";

interface Props {
  checkoutItems: CheckoutItemType[];
}

const CheckoutRow = ({ checkoutItems }: Props) => {
  const [items, setItem] = useState(checkoutItems);
  const { item } = useDeletionStore();

  useEffect(() => {
    // remove the item
    if (item) {
      setItem((prev) => prev.filter((i) => i.id !== item));
    }
  }, [item]);

  return (
    <div className="grid gap-4">
      {items.map((item, i) => (
        <ItemCard CheckoutItem={item} key={i} />
      ))}
    </div>
  );
};

export default CheckoutRow;
