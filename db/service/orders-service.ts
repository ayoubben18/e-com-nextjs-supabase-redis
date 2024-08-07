"use server";
import { authenticatedAction } from "@/actions/authenticatedActions";
import { Delivery } from "@/enums/delivery.enum";
import { redis } from "@/lib/redis";
import { logger } from "@/logger/logger";
import cashSchema from "@/schema/cashSchema";
import { CheckoutItemType } from "@/types/DtoTypes";
import { createClient } from "@/utils/supabase/server";
import { flattenValidationErrors } from "next-safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";
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

const deleteOrder = authenticatedAction.schema(
  z.object({
    orderId: z.string(),
  }),
  {
    handleValidationErrorsShape: (e) => flattenValidationErrors(e),
  },
).action(async ({ ctx: { userId }, parsedInput: { orderId } }) => {
  const supabase = createClient();

  await removeOrderById(supabase, orderId, userId);
  const checkout = await redis.get(`user-checkout:${userId}`);
  // filter the deleted one
  const newCheckout = (checkout as CheckoutItemType[]).filter((item) =>
    item.id !== orderId
  );

  if (newCheckout.length === 0) {
    await redis.del(`user-checkout:${userId}`);
  }

  await redis.set(`user-checkout:${userId}`, newCheckout);
});

const createNewOrder = authenticatedAction.schema(
  z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
    color: z.string().nullable(),
    size: z.string().nullable(),
  }),
  {
    handleValidationErrorsShape: (e) => flattenValidationErrors(e),
  },
).action(
  async ({
    ctx: { userId },
    parsedInput: {
      productId,
      quantity,
      price,
      color,
      size,
    },
  }) => {
    const supabase = createClient();

    const order = await getSimilarOrder(
      supabase,
      userId,
      Delivery.NotPlaced,
      productId,
      color!,
      size!,
    );

    if (order) {
      logger.debug("Updating order quantity");
      const updatedOrder = await updateOrderQuatity(
        supabase,
        order.quantity + quantity,
        order.id,
        order.price! + price,
      );

      revalidateTag("checkoutItems");

      return updatedOrder;
    }
    logger.debug("Creating new order");

    const newOrder = await createOrder(
      supabase,
      userId,
      productId,
      quantity,
      price,
      color!,
      size!,
    );

    revalidateTag("checkoutItems");

    return newOrder;
  },
);

// const getCheckoutItems = authenticatedAction.action(
//   async ({ ctx: { userId } }) => {
//     const supabase = createClient();
//     const orders = await getCheckoutOrders(
//       supabase,
//       userId,
//       Delivery.NotPlaced,
//     );

//     if (!orders) {
//       return [];
//     }
//     return orders;
//   },
// );

const getCheckoutItems = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const supabase = createClient();
    const orders = await getCheckoutOrders(
      supabase,
      userId,
      Delivery.NotPlaced,
    );

    if (!orders) {
      return [];
    }
    return orders;
  },
);

const getUserOrders = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const supabase = createClient();
    const orders = await getAllDelivery(supabase, userId);
    return orders;
  },
);

const checkout = authenticatedAction.schema(
  z.object({
    totalPrice: z.number(),
    credentials: cashSchema,
  }),
  {
    handleValidationErrorsShape: (e) => flattenValidationErrors(e),
  },
).action(
  async (
    { ctx: { userId, email, name }, parsedInput: { totalPrice, credentials } },
  ) => {
    const supabase = createClient();
    const newDelivery = await createDelivery(
      supabase,
      userId,
      Delivery.Placed,
      totalPrice,
      credentials,
      name!,
      email!,
    );

    if (!newDelivery) {
      throw new Error("Delivery not created");
    }

    await updateOrders(
      supabase,
      userId,
      Delivery.NotPlaced,
      Delivery.Placed,
      newDelivery.id,
    );
  },
);

export const getDeliveryOrders = authenticatedAction.schema(
  z.object({
    deliveryId: z.string(),
  }),
  {
    handleValidationErrorsShape: (e) => flattenValidationErrors(e),
  },
).action(async ({ ctx: { userId }, parsedInput: { deliveryId } }) => {
  const supabase = createClient();
  const redisDeliveryItems = await redis.get(
    `user-placed:${userId}/${deliveryId}`,
  );
  if (redisDeliveryItems) {
    return redisDeliveryItems as CheckoutItemType[];
  }

  const orders = await getOrdersByDeliveryId(supabase, deliveryId);
  if (!orders) {
    return [];
  }

  return orders;
});

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

export {
  checkout,
  createNewOrder,
  deleteOrder,
  getCheckoutItems,
  getUserOrders,
};
