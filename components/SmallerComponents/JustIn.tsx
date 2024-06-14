import ProductHomeCard from "../MappingCompenents/ProductHomeCard";

export default function JustIn() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              New Arrivals
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Just In
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the latest additions to our collection. These
              fashion-forward pieces are sure to turn heads and elevate your
              style.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2].map((i) => (
            <ProductHomeCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
