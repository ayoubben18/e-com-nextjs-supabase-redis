import { getDeliveryOrders } from "@/db/service/orders-service";
import React from "react";

const page = async () => {
  const del = await getDeliveryOrders({
    deliveryId: "e283bcc5-680d-4985-a269-bf7ceaee3aa4",
  });
  return <div>{del?.data?.map((item, index) => <div>{item.price}</div>)}</div>;
};

export default page;
