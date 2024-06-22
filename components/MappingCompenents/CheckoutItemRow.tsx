import { CheckoutItemType } from "@/types/DtoTypes";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { getTotlaePrice } from "@/lib/calculations/getTotalePrice";

interface Props {
  item: CheckoutItemType;
}

export default function CheckoutItemRow({ item }: Props) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Image
            priority
            src="/product.webp"
            alt="Product Image"
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
          <div>
            <h4 className="font-medium">{item.products.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Size: {item.size}, Color: {item.color}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>$ {item.price}</TableCell>
    </TableRow>
  );
}
