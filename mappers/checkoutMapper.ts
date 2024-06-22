// import { CheckoutItemType } from "@/types/DtoTypes";
// import { Order, Product } from "@/types/tablesTypes";

// export function mapCheckoutMapToCheckoutItemArray(
//   checkoutmap: Map<Order, Product>,
// ): CheckoutItemType[] {
//   const checkoutItems: CheckoutItemType[] = [];

//   checkoutmap.forEach((product, order) => {
//     const checkoutItem: CheckoutItemType = {
//       id: order.id,
//       image: null,
//       price: order.price!,
//       quantity: order.quantity,
//       color: order.color,
//       size: order.size,
//     };

//     checkoutItems.push(checkoutItem);
//   });

//   return checkoutItems;
// }
