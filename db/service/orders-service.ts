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
  getOrdersByDeliveryId,
  removeOrderById,
  updateOrder,
  updateOrderQuatity,
} from "../data/orders.data";
import { getProductById } from "../data/products.data";
import { getUser } from "../data/users.data";
import { createDelivery, getAllDelivery } from "../data/delivery.data";
import { Delivery } from "@/enums/delivery.enum";

export async function deleteOrder(orderId: string): Promise<void> {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  await removeOrderById(supabase, orderId, user.id);
  revalidateTag("get-checkout-items");
}

export async function createNewOrder(
  productId: string,
  quantity: number,
  price: number,
  color?: string | null,
  size?: string | null,
): Promise<Order> {
  const supabase = createClient();

  const user = await getUser(supabase);
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
        order.price! + price,
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
    price,
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

    const user = await getUser(supabase);

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

export async function getUserOrders() {
  const supabase = createClient();

  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  const orders = await getAllDelivery(supabase, user.id);

  return orders;
}

export async function checkout(ordersIds: string[], totalPrice: number) {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }

  const newDelivery = await createDelivery(
    supabase,
    user.id,
    Delivery.Placed,
    totalPrice,
  );

  if (!newDelivery) {
    throw new Error("Delivery not created");
  }

  for (const orderId of ordersIds) {
    await updateOrder(supabase, orderId, Delivery.Placed, newDelivery.id);
  }
  revalidateTag("get-checkout-items");
}

export async function getDeliveryOrders(deliveryId: string) {
  const checkoutmap = new Map<Order, Product>();
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  const orders = await getOrdersByDeliveryId(supabase, deliveryId);
  for (const order of orders) {
    const product = await getProductById(supabase, order.product_id);
    if (!product) {
      orders.splice(orders.indexOf(order), 1);
    } else {
      checkoutmap.set(order, product);
    }
  }

  return mapCheckoutMapToCheckoutItemArray(checkoutmap);
}

// export async function getCheckoutItems(): Promise<CheckoutItemType[]> {
//   const checkoutmap = new Map<Order, Product>();
//   const supabase = createClient();

//   const user = await getUser(supabase);

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
