import Link from "next/link";
import { Button } from "../ui/button";
import ProductHomeCard from "../MappingCompenents/ProductHomeCard";

export default function MustHaves() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Featured Products
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              This Season's Must-Haves
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elevate your wardrobe with our carefully curated collection of
              fashion-forward pieces, designed to make you stand out from the
              crowd.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <ProductHomeCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
