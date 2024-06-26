"use server";
import { Delivery } from "@/enums/delivery.enum";
import { Order } from "@/types/tablesTypes";
import { createCachedClient } from "@/utils/supabase/cachedClient";
import { createClient } from "@/utils/supabase/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { createDelivery, getAllDelivery } from "../data/delivery.data";
import {
  createOrder,
  getCheckoutOrders,
  getOrdersByDeliveryId,
  getSimilarOrder,
  removeOrderById,
  updateOrderQuatity,
  updateOrders,
} from "../data/orders.data";
import { getUser } from "../data/users.data";
import { revalidateTag, unstable_cache } from "next/cache";
import { redis } from "@/lib/redis";
import { CheckoutItemType } from "@/types/DtoTypes";
import { z } from "zod";
import cashSchema from "@/schema/cashSchema";

export async function deleteOrder(orderId: string): Promise<void> {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  await removeOrderById(supabase, orderId, user.id);
  const checkout = await redis.get(`user-checkout:${user.id}`);
  // filter the deleted one
  const newCheckout = (checkout as CheckoutItemType[]).filter((item) =>
    item.id !== orderId
  );

  if (newCheckout.length === 0) {
    await redis.del(`user-checkout:${user.id}`);
  }

  await redis.set(`user-checkout:${user.id}`, newCheckout);
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

  const order = await getSimilarOrder(
    supabase,
    user.id,
    Delivery.NotPlaced,
    productId,
    color!,
    size!,
  );

  if (order) {
    const updatedOrder = await updateOrderQuatity(
      supabase,
      order.quantity + quantity,
      order.id,
      order.price! + price,
    );

    revalidateTag("checkoutItems");

    return updatedOrder;
  }

  const newOrder = await createOrder(
    supabase,
    user.id,
    productId,
    quantity,
    price,
    color!,
    size!,
  );

  revalidateTag("checkoutItems");

  return newOrder;
}

export const getCheckoutItems = async () => {
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    throw new Error("User not found");
  }

  // redis
  // const checkoutRedisItems = await redis.get(`user-checkout:${user.id}`);

  // if (checkoutRedisItems) {
  //   return checkoutRedisItems as CheckoutItemType[];
  // }

  // db
  const orders = await getCheckoutOrders(
    supabase,
    user.id,
    Delivery.NotPlaced,
  );

  if (!orders) {
    return [];
  }
  return orders;
};

export async function getUserOrders(userId: string) {
  const supabase = createClient();
  const orders = await getAllDelivery(supabase, userId);
  return orders;
}

export async function checkout(
  totalPrice: number,
  credentials: z.infer<typeof cashSchema>,
) {
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
    credentials,
  );

  if (!newDelivery) {
    throw new Error("Delivery not created");
  }

  await updateOrders(
    supabase,
    user.id,
    Delivery.NotPlaced,
    Delivery.Placed,
    newDelivery.id,
  );
}

export async function getDeliveryOrders(deliveryId: string) {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new Error("User not found");
  }
  const redisDeliveryItems = await redis.get(
    `user-placed:${user.id}/${deliveryId}`,
  );
  if (redisDeliveryItems) {
    return redisDeliveryItems as CheckoutItemType[];
  }

  const orders = await getOrdersByDeliveryId(supabase, deliveryId);
  if (!orders) {
    return [];
  }

  return orders;
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
