"use client";
import { SearchIcon } from "@/svgs";
import { Input } from "../ui/input";
import useSearchStore from "@/stores/searchStore";
import { Label } from "../ui/label";
import { AlertCircle } from "lucide-react";

export default function SearchBar() {
  const { setSearchTerm, searchTerm } = useSearchStore();

  return (
    <div>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <Input
          defaultValue={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="search"
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-200 px-12 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:focus:border-gray-50 dark:focus:ring-gray-50"
        />
      </div>{" "}
      <Label
        htmlFor="search"
        className="ml-2 mt-2 flex items-center gap-2 opacity-50"
      >
        <AlertCircle className="h-4 w-4" />
        We are using an advanced search algorithm, so it takes a litlle bit of
        time to find the best results for you.
      </Label>
    </div>
  );
}
