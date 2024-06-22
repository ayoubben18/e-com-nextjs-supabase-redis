"use server";
import { handleStatus } from "@/errors/handleStatus";
import { CheckoutItemType } from "@/types/DtoTypes";
import { Order, OrderStatus } from "@/types/tablesTypes";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";

export async function getOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: OrderStatus,
): Promise<Order[] | null> {
  const { data, status: reqStatus } = await supabase.from("orders").select("*")
    .eq(
      "user_id",
      userId,
    ).eq("status", status);

  return handleStatus(reqStatus, data) as Order[] | null;
}

export async function getSimilarOrder(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
  productId: string,
  color: string,
  size: string,
) {
  const { data, status: reqStatus } = await supabase.from("orders").select("*")
    .eq(
      "user_id",
      userId,
    ).eq("status", status)
    .eq("product_id", productId)
    .eq("color", color)
    .eq("size", size)
    .single();
  console.log("find product ", reqStatus);

  return handleStatus(reqStatus, data) as Order | null;
}

export async function getCheckoutOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: string,
): Promise<CheckoutItemType[] | null> {
  // add a join with products table to get also the name of the product
  const { data, status: reqStatus } = await supabase
    .from("orders")
    .select("*, products(name)")
    .eq("user_id", userId)
    .eq("status", status);
  console.log(data);

  return handleStatus(reqStatus, data) as CheckoutItemType[] | null;
}

export async function getOrdersByDeliveryId(
  supabase: TypedSupabaseClient,
  deliveryId: string,
) {
  const { data, status } = await supabase.from("orders").select(
    "*, products(name)",
  ).eq(
    "delivery_id",
    deliveryId,
  );

  return handleStatus(status, data) as CheckoutItemType[] | null;
}

export async function createOrder(
  supabase: TypedSupabaseClient,
  userId: string,
  productId: string,
  quantity: number,
  price: number,
  color: string,
  size: string,
): Promise<Order> {
  const { data, status } = await supabase.from("orders").insert([
    {
      product_id: productId,
      user_id: userId,
      quantity,
      price,
      color: color,
      size: size,
    },
  ]).select("*").single();

  return handleStatus(status, data) as Order;
}

export async function removeOrderById(
  supabase: TypedSupabaseClient,
  orderId: string,
  userId: string,
): Promise<void> {
  const { status } = await supabase.from("orders").delete().eq("id", orderId)
    .eq(
      "user_id",
      userId,
    );

  handleStatus(status, null);
}

export async function updateOrderQuatity(
  supabase: TypedSupabaseClient,
  newQuatity: number,
  orderId: string,
  price: number,
): Promise<Order> {
  const { data, status } = await supabase.from("orders").update({
    quantity: newQuatity,
    price,
  }).eq("id", orderId).select("*").single();
  console.log("update status", status);

  return handleStatus(status, data) as Order;
}

export async function updateOrders(
  supabase: TypedSupabaseClient,
  userId: string,
  status: OrderStatus,
  newStatus: OrderStatus,
  deliveryId: string,
): Promise<Order[]> {
  const { data, status: reqStatus } = await supabase.from("orders").update({
    status: newStatus,
    delivery_id: deliveryId,
  }).eq("user_id", userId).eq("status", status).select("*");

  return handleStatus(reqStatus, data) as Order[];
}
