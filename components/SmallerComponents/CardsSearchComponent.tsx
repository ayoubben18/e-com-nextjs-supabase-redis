"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import {
  embedAndSearch,
  getInfiniteProducts,
} from "@/db/service/product-service";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSearchStore from "@/stores/searchStore";
import { Product } from "@/types/tablesTypes";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import SkeletonSection from "./SkeletonSection";
import { useIntersection } from "@mantine/hooks";

export default function CardsSearchComponent() {
  // const { ref, inView } = useInView();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [debounced] = useDebounce(searchTerm, 1000);

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getInfiniteProducts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (entry?.isIntersecting && debounced === "") {
      fetchNextPage().then((res) => {
        console.log(res.data?.pages.flatMap((page) => page.data) || []);

        setProducts(res.data?.pages.flatMap((page) => page.data) || []);
      });
    }

    if (debounced !== "") {
      embedAndSearch(debounced).then((res) => {
        setProducts(res);
      });
      // toast.info(`Found: ${products.length} products`);
    }
  }, [entry, fetchNextPage, debounced]);

  if (status === "pending" && debounced === "") return <SkeletonSection />;
  if (status === "error") toast.error("Error fetching products");
  return (
    <div className="col-span-2">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => {
          if (i === products.length - 1) {
            return <div key={i} ref={ref}></div>;
          }
          return (
            <Link href={`/product/${product.id}`} key={i}>
              <SearchProductCard product={product} />
            </Link>
          );
        })}
      </div>
      {/* { */}

      <div ref={ref} className="flex flex-col items-center">
        {isFetchingNextPage && products.length > 0 && (
          <div className="loader" />
        )}
      </div>
      {/* } */}
    </div>
  );
}
