import { CheckoutItemType } from "@/types/DtoTypes";
import { Order, Product } from "@/types/tablesTypes";

export function mapCheckoutMapToCheckoutItemArray(
  checkoutmap: Map<Order, Product>,
): CheckoutItemType[] {
  const checkoutItems: CheckoutItemType[] = [];

  checkoutmap.forEach((product, order) => {
    const checkoutItem: CheckoutItemType = {
      id: order.id,
      name: product.name,
      image: null,
      price: product.price,
      quantity: order.quantity,
      color: order.color,
      size: order.size,
    };

    checkoutItems.push(checkoutItem);
  });

  return checkoutItems;
}
