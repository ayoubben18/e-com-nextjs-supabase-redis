import { CheckoutItemType } from "@/types/DtoTypes";

export function getTotlaePrice(items: CheckoutItemType[]): number {
  //   const totalePrice = items.reduce((acc, item) => {
  //     return acc + item.price * item.quantity;
  //   });
  // use reduce funtion to calculate it
  const totalePrice = items.reduce((acc, item) => {
    if (!item.price) return acc;
    return acc + item.price;
  }, 0);
  return Number(totalePrice.toFixed(2));
}
