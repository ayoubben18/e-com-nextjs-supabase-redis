"use client";
import { fetchProductsService } from "@/db/service/product-service";
import { useFilterStore } from "@/stores/filterStore";
import useSearchStore from "@/stores/searchStore";
import { Product } from "@/types/tablesTypes";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import { SkeletonCard } from "../MappingCompenents/SkeletonCard";
import { Button } from "../ui/button";

export default function CardsSearchComponent() {
  const { rating, topPrice } = useFilterStore();
  const [page, setPage] = useState(1);
  const { searchTerm } = useSearchStore();
  const [debounced] = useDebounce(searchTerm, 1000);
  const [products, setProducts] = useState<Product[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["products", page, debounced, rating, topPrice],
    queryFn: async () => {
      const products = await fetchProductsService(
        page,
        debounced,
        rating,
        topPrice,
      );
      if (products?.length === 0 && debounced.length < 3) {
        toast.info("No products left");
      } else if (products?.length === 0 && debounced.length >= 3) {
        toast.info(`No products found for "${debounced}"`);
      } else if (products && debounced.length < 3) {
        setProducts((prev) => [...prev, ...products]);
      } else if (products && debounced.length >= 3) {
        setProducts(products);
      }
    },
    retry: false,
  });

  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [debounced, rating, topPrice]);

  const loadMoreProducts = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="col-span-3">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => {
          return (
            <Link href={`/product/${product.id}`} key={i}>
              <SearchProductCard product={product} />
            </Link>
          );
        })}
        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
      {!isLoading && debounced.length < 3 && (
        <div className="mt-5 flex w-full justify-center">
          <Button className="group" onClick={loadMoreProducts}>
            <span className="group-hover:text-white">Show more</span>
            <PlusCircle className="ml-2 group-hover:stroke-white" />
          </Button>
        </div>
      )}
    </div>
  );
}
