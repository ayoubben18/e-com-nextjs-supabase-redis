import { Delivery } from "@/types/tablesTypes";
import { TableCell, TableRow } from "../ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ActiveItem({
  order,
  i,
}: {
  order: Delivery;
  i: number;
}) {
  return (
    <TableRow>
      <TableCell>Order N{i}</TableCell>
      <TableCell>{format(new Date(order.created_at), "MM-dd-yyyy")}</TableCell>
      <TableCell>$170.99</TableCell>
      <TableCell>
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300",
            order.state === "shipping" &&
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            order.state === "received" &&
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            order.state === "placed" &&
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          )}
        >
          {order.state}
        </div>
      </TableCell>
    </TableRow>
  );
}
