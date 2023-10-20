"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchQuery.length < 3) {
            console.log("Search query must be at least 3 characters long");
            return;
        }else if (typeof searchQuery !== "string") {
            console.log("Search query must be a string");
            return;
        }else if (searchQuery === "") {
            return;
        }

        const encodedSearchQuery = encodeURIComponent(searchQuery);

        router.push(`/search?q=${encodedSearchQuery}`);

    }



  return (
    <form className="w-full sm:max-w-xs" onSubmit={handleSearch}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-charcoal-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-charcoal-900 ring-1 ring-inset ring-charcoal-300 placeholder:text-charcoal-400 focus:ring-2 focus:ring-inset focus:ring-charcoal-600 sm:text-sm sm:leading-6"
          placeholder="Search city, zip or daycare name"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchBar;
