"use client";
import { Delivery } from "@/types/tablesTypes";
import { TableCell, TableRow } from "../ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getDeliveryOrders } from "@/db/service/orders-service";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export default function ActiveItem({
  delivery,
  i,
}: {
  delivery: Delivery;
  i: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["getDelivery", delivery.id],
    queryFn: async () => getDeliveryOrders(delivery.id),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow>
          <TableCell>Order N{i}</TableCell>
          <TableCell>
            {format(new Date(delivery.created_at), "MM-dd-yyyy")}
          </TableCell>
          <TableCell>${delivery.total_price}</TableCell>
          <TableCell>
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300",
                delivery.state === "shipping" &&
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                delivery.state === "received" &&
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                delivery.state === "placed" &&
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
              )}
            >
              {delivery.state}
            </div>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order N{i}</DialogTitle>
          <DialogDescription>
            {format(new Date(delivery.created_at), "MM-dd-yyyy")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {data?.length === 0 ? (
            <h1>No Orders</h1>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">name</TableHead>
                  <TableHead>quantity</TableHead>
                  <TableHead>size</TableHead>
                  <TableHead>color</TableHead>
                  <TableHead className="text-right">price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  data?.map((order, i) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {order.products.name}
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.size}</TableCell>
                      <TableCell>{order.color}</TableCell>
                      <TableCell className="text-right">
                        ${order.price}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
