import { StarIcon } from "@/svgs";
import Link from "next/link";

export default function SearchProductCard() {
  return (
    <div className="group relative">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View</span>
      </Link>
      <img
        src="/product.webp"
        alt="Product Image"
        width={300}
        height={300}
        className="aspect-square w-full rounded-lg object-cover transition-opacity group-hover:opacity-50"
      />
      <div className="flex-1 py-4">
        <h3 className="font-semibold tracking-tight">
          Wireless Noise-Cancelling Headphones
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-0.5">
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-primary" />
            <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
          </div>
          <span className="text-gray-500 dark:text-gray-400">(4.3)</span>
        </div>
        <h4 className="font-semibold">$99.99</h4>
      </div>
    </div>
  );
}
