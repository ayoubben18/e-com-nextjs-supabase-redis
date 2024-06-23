"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useFilterStore } from "@/stores/filterStore";
import PriceFilter from "../Filters/PriceFilter";
import RatingFilter from "../Filters/RatingFilter";
import { Button } from "../ui/button";

export default function FiltersComponent() {
  const { removeFilters } = useFilterStore();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent>
          {" "}
          <div className="flex flex-col gap-6">
            <PriceFilter></PriceFilter>
            <RatingFilter></RatingFilter>
            <Button variant={"outline"} onClick={removeFilters}>
              Remove Filters
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
