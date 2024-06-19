import CategoryFilter from "../Filters/CategoryFilter";
import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import { Button } from "../ui/button";

export default function FiltersComponent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-2 text-lg font-semibold">Filters</h2>
        <div className="flex flex-wrap gap-4 md:flex-col">
          {/* <CategoryFilter></CategoryFilter> */}
          <PriceFilter></PriceFilter>
          <RatingFilter></RatingFilter>
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm">Apply Filters</Button>
      </div>
    </div>
  );
}
