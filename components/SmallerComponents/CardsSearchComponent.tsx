import Link from "next/link";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import { getProducts } from "@/db/data/products";
import { createClient } from "@/utils/supabase/server";

export default async function CardsSearchComponent() {
  const supabase = createClient();
  const products = await getProducts(supabase);
  if (!products) return null;
  return (
    <div className="col-span-2 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <Link href={`/product/${product.id}`} key={i}>
          <SearchProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
