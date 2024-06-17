import { StarIcon } from "@/svgs";
import { Product } from "@/types/tablesTypes";

interface Props {
  product: Product;
}

export default function SearchProductCard({ product }: Props) {
  const ratingArray: number[] = Array.from(
    { length: Math.floor(product.general_rating) },
    (_, i) => i,
  );
  const missingArray: number[] = Array.from(
    { length: 5 - Math.floor(product.general_rating) },
    (_, i) => i,
  );
  return (
    <div className="group relative">
      <img
        src="/product.webp"
        alt="Product Image"
        width={300}
        height={300}
        className="aspect-square w-full rounded-lg object-cover transition-opacity group-hover:opacity-50"
      />
      <div className="flex-1 py-4">
        <h3 className="font-semibold tracking-tight">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-0.5">
            {ratingArray.map((i) => (
              <StarIcon className="h-4 w-4 fill-primary" />
            ))}
            {missingArray.map((i) => (
              <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            ({product.general_rating})
          </span>
        </div>
        <h4 className="font-semibold">$ {product.price}</h4>
      </div>
    </div>
  );
}
