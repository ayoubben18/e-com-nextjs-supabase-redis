"use server";

import { mapCheckoutMapToCheckoutItemArray } from "@/mappers/checkoutMapper";
import { Order, Product } from "@/types/tablesTypes";
import { createCachedClient } from "@/utils/supabase/cachedClient";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag, unstable_cache } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
  createOrder,
  getOrders,
  removeOrderById,
  updateOrderQuatity,
} from "../data/orders.data";
import { getProductById } from "../data/products";
import { getUserId } from "../data/users.data";

export async function deleteOrder(orderId: string): Promise<void> {
  const supabase = createClient();
  const user = await getUserId(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  await removeOrderById(supabase, orderId, user.id);
  revalidateTag("get-checkout-items");
}

export async function createNewOrder(
  productId: string,
  quantity: number,
  color?: string | null,
  size?: string | null,
): Promise<Order> {
  const supabase = createClient();

  const user = await getUserId(supabase);
  if (!user) {
    throw new Error("User not found");
  }

  const orders = await getOrders(supabase, user.id, "notplaced");

  for (const order of orders) {
    if (
      order.product_id === productId && order.color === color &&
      order.size === size
    ) {
      const newOrder = await updateOrderQuatity(
        supabase,
        order.quantity + quantity,
        order.id,
      );
      revalidateTag("get-checkout-items");

      return newOrder;
    }
  }

  const newOrder = await createOrder(
    supabase,
    user.id,
    productId,
    quantity,
    color,
    size,
  );
  revalidateTag("get-checkout-items");

  return newOrder;
}

export const getCheckoutItems = unstable_cache(
  async (cookieStore: ReadonlyRequestCookies) => {
    const checkoutmap = new Map<Order, Product>();
    const supabase = createCachedClient(cookieStore);

    const user = await getUserId(supabase);

    if (!user) {
      throw new Error("User not found");
    }
    const orders = await getOrders(supabase, user.id, "notplaced");

    for (const order of orders) {
      const product = await getProductById(supabase, order.product_id);
      if (!product) {
        orders.splice(orders.indexOf(order), 1);
      } else {
        checkoutmap.set(order, product);
      }
    }

    return mapCheckoutMapToCheckoutItemArray(checkoutmap);
  },
  ["get-checkout-items"],
  {
    tags: [
      "get-checkout-items",
    ],
  },
);

// export async function getCheckoutItems(): Promise<CheckoutItemType[]> {
//   const checkoutmap = new Map<Order, Product>();
//   const supabase = createClient();

//   const user = await getUserId(supabase);

//   if (!user) {
//     throw new Error("User not found");
//   }
//   const orders = await getOrders(supabase, user.id, "notplaced");

//   for (const order of orders) {
//     const product = await getProductById(supabase, order.product_id);
//     if (!product) {
//       orders.splice(orders.indexOf(order), 1);
//     } else {
//       checkoutmap.set(order, product);
//     }
//   }

//   return mapCheckoutMapToCheckoutItemArray(checkoutmap);
// }
