"use client";
import { fetchProductsService } from "@/db/service/product-service";
import { useFilterStore } from "@/stores/filterStore";
import useSearchStore from "@/stores/searchStore";
import { FullProductType } from "@/types/FullProductType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import { SkeletonCard } from "../MappingCompenents/SkeletonCard";
import { Button } from "../ui/button";

export default function CardsSearchComponent() {
  const itemsPerPage = 10;
  const { rating, topPrice } = useFilterStore();
  const { searchTerm } = useSearchStore();
  const [debounced] = useDebounce(searchTerm, 1000);
  const [products, setProducts] = useState<FullProductType[]>([]);

  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const products = await fetchProductsService(
        pageParam,
        itemsPerPage,
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
      return products;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === itemsPerPage ? allPages.length + 1 : undefined,
  });

  useEffect(() => {
    setProducts([]);
    refetch();
  }, [debounced, rating, topPrice]);

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
        {(isFetching || isFetchingNextPage) && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
      {debounced.length < 3 && (
        <div className="mt-5 flex w-full justify-center">
          <Button
            className="group"
            onClick={() => fetchNextPage()}
            disabled={isFetching || isFetchingNextPage || !hasNextPage || false}
          >
            <span className="group-hover:text-white">Show more</span>
            <PlusCircle className="ml-2 group-hover:stroke-white" />
          </Button>
        </div>
      )}
    </div>
  );
}
