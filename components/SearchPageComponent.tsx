import CardsSearchComponent from "./SmallerComponents/CardsSearchComponent";
import FiltersComponent from "./SmallerComponents/FiltersComponent";
import SearchBar from "./SmallerComponents/SearchBar";

const SearchPageComponent = () => {
  // noStore();
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Search</h1>
          <SearchBar />
        </div>
        <FiltersComponent />
        <CardsSearchComponent />
      </div>
    </main>
  );
};

export default SearchPageComponent;
