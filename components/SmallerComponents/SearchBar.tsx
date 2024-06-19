"use client";
import { SearchIcon } from "@/svgs";
import { Input } from "../ui/input";
import useSearchStore from "@/stores/searchStore";

export default function SearchBar() {
  const { setSearchTerm } = useSearchStore();

  return (
    <div className="relative">
      <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        defaultValue={""}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        type="search"
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-200 px-12 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:focus:border-gray-50 dark:focus:ring-gray-50"
      />
    </div>
  );
}
