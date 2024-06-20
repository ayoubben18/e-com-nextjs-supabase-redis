"use client";
import useSearchStore from "@/stores/searchStore";
import { Product } from "@/types/tablesTypes";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import SearchProductCard from "../MappingCompenents/SearchProductCard";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { SkeletonCard } from "../MappingCompenents/SkeletonCard";
import { fetchProductsService } from "@/db/service/product-service";
import { toast } from "sonner";
import { useFilterStore } from "@/stores/filterStore";
import { unstable_noStore } from "next/cache";

export default function CardsSearchComponent() {
  // const { ref, inView } = useInView();
  const { rating, topPrice } = useFilterStore();
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(0);
  const { searchTerm } = useSearchStore();
  const [debounced] = useDebounce(searchTerm, 1000);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    startTransition(async () => {
      const products = await fetchProductsService(
        page,
        debounced,
        rating,
        topPrice,
      );
      if (products?.length === 0 && debounced.length < 3) {
        toast.info("No products left");
      } else if (products?.length === 0 && debounced.length > 3) {
        toast.info(`No products found for "${debounced}"`);
      }
      if (products && debounced.length < 3) {
        setProducts((prev) => [...prev, ...products]);
      } else if (products) {
        setProducts(products);
      }
    });
  };

  useEffect(() => {
    loadProducts().catch((e) => {
      toast.error("Error fetching products");
    });
    // return () => {
    //   setPage(0);
    //   setSearchTerm("");
    //   setProducts([]);
    // };
  }, [debounced, page, rating, topPrice]);

  useEffect(() => {
    setPage(0);
    setProducts([]);
  }, [debounced, topPrice, rating]);

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
        {isPending && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
      {!isPending && debounced.length < 3 && (
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
