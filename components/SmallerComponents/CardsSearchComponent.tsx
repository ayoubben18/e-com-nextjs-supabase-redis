"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import { getInfiniteProducts } from "@/db/service/product-service";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSearchStore from "@/stores/searchStore";
import { Product } from "@/types/tablesTypes";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

export default function CardsSearchComponent() {
  const { ref, inView } = useInView();
  const { searchTerm } = useSearchStore();
  const [products, setProducts] = useState<Product[]>([]);
  const debounced = useDebounce(searchTerm ? searchTerm : "", 500);

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam }) => getInfiniteProducts({ pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage().then((res) => {
        setProducts(res.data?.pages.flatMap((page) => page.data) || []);
      });
    }
    // if (status === "success") {
    // }
    if (!debounced && debounced !== "") {
      setProducts([]);
    }
    // return () => {};
  }, [inView, fetchNextPage, debounced, status]);

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "error") toast.error("Error fetching products");
  if (!data) return null;
  return (
    <div className="col-span-2 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <Link href={`/product/${product.id}`} key={i}>
          <SearchProductCard product={product} />
        </Link>
      ))}

      {<div ref={ref}>{inView && <h2>Loading more...</h2>}</div>}
    </div>
  );
}
