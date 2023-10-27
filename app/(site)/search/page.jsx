"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { searchDaycares } from "./actions";
import NavBar from "../components/NavBar";
import EmptyState from "../components/EmptyState";
import DaycareCard from "../components/DaycareCard";
import BreadCrumbs from "../components/BreadCrumbs";
import DaycaresList from "../components/DaycaresList";




function SearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const [daycares, setDaycares] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    searchDaycares(searchQuery)
      .then(setDaycares)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="min-h-full">
      {/* Page header */}
      <NavBar />

      {/* Body */}
      <main className="py-10">
        {/* Main container */}

        {/* Header section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pb-6">
          <BreadCrumbs
            pages={[
              { name: "Cities", href: "/city", current: false },
              { name: "Search", href: "/search", current: true },
            ]}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Search Results for "{searchQuery}"
            </h2>
          </div>
        </div>
          {loading && <p>Loading...</p>}
          {!loading &&
            (daycares.length === 0 ? (
              <EmptyState emptyStateText={"No Daycares Found"} />
            ) : (
              <DaycaresList daycares={daycares}/>
            ))}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
