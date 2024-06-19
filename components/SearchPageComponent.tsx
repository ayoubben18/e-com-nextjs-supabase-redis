import { Suspense } from "react";
import CardsSearchComponent from "./SmallerComponents/CardsSearchComponent";
import FiltersComponent from "./SmallerComponents/FiltersComponent";
import SearchBar from "./SmallerComponents/SearchBar";

const SearchPageComponent = () => {
  return (
    <main className="f top-0 mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Search</h1>
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FiltersComponent />
          <Suspense fallback={<h2>Loading...</h2>}>
            <CardsSearchComponent />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default SearchPageComponent;
