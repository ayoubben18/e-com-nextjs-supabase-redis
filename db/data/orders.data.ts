"use server";
import { handleStatus } from "@/errors/handleStatus";
import { logger } from "@/logger/logger";
import { CheckoutItemType } from "@/types/DtoTypes";
import { Orders } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";

export async function getOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
): Promise<Orders[] | null> {
  const { data, error, status: reqStatus } = await supabase.from("orders")
    .select("*")
    .eq(
      "user_id",
      userId,
    ).eq("status", status);

  return handleStatus(error, reqStatus, data) as Orders[] | null;
}

export async function getSimilarOrder(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
  productId: string,
  color: string,
  size: string,
) {
  const { data, error, status: reqStatus } = await supabase.from("orders")
    .select("*")
    .eq(
      "user_id",
      userId,
    ).eq("status", status)
    .eq("product_id", productId)
    .eq("color", color)
    .eq("size", size)
    .single();

  return handleStatus(error, reqStatus, data) as Orders | null;
}

export async function getCheckoutOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
): Promise<CheckoutItemType[] | null> {
  // add a join with products table to get also the name of the product
  const { data, error, status: reqStatus } = await supabase
    .from("orders")
    .select("*, products(name)")
    .eq("user_id", userId)
    .eq("status", status);

  return handleStatus(error, reqStatus, data) as CheckoutItemType[] | null;
}

export async function getOrdersByDeliveryId(
  supabase: TypedSupabaseClient,
  deliveryId: string,
) {
  const { data, error, status } = await supabase.from("orders").select(
    "*, products(name)",
  ).eq(
    "delivery_id",
    deliveryId,
  );

  return handleStatus(error, status, data) as CheckoutItemType[] | null;
}

export async function createOrder(
  supabase: TypedSupabaseClient,
  userId: string,
  productId: string,
  quantity: number,
  price: number,
  color: string,
  size: string,
): Promise<Orders> {
  const { data, error, status } = await supabase.from("orders").insert([
    {
      product_id: productId,
      user_id: userId,
      quantity,
      price,
      color: color,
      size: size,
    },
  ]).select("*").single();

  error && logger.error(error.message);

  return handleStatus(error, status, data) as Orders;
}

export async function removeOrderById(
  supabase: TypedSupabaseClient,
  orderId: string,
  userId: string,
): Promise<void> {
  const { status, error } = await supabase.from("orders").delete().eq(
    "id",
    orderId,
  )
    .eq(
      "user_id",
      userId,
    );

  handleStatus(error, status, null);
}

export async function updateOrderQuatity(
  supabase: TypedSupabaseClient,
  newQuatity: number,
  orderId: string,
  price: number,
): Promise<Orders> {
  const { data, error, status } = await supabase.from("orders").update({
    quantity: newQuatity,
    price,
  }).eq("id", orderId).select("*").single();

  return handleStatus(error, status, data) as Orders;
}

export async function updateOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
  newStatus: string,
  deliveryId: string,
): Promise<Orders[]> {
  const { data, error, status: reqStatus } = await supabase.from("orders")
    .update({
      status: newStatus,
      delivery_id: deliveryId,
    }).eq("user_id", userId).eq("status", status).select("*");

  return handleStatus(error, reqStatus, data) as Orders[];
}
