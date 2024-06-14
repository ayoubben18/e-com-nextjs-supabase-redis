import SearchProductCard from "../MappingCompenents/SearchProductCard";

export default function CardsSearchComponent() {
  return (
    <div className="col-span-2 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, i) => (
        <SearchProductCard key={i} />
      ))}
    </div>
  );
}
