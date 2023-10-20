"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { searchDaycares } from "./actions";
import Image from "next/image";
import NavBar from "../components/NavBar";
import EmptyState from "../components/EmptyState";
import { format } from "path";
import Link from "next/link";
import DaycareCard from "../components/DaycareCard";




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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && <p>Loading...</p>}
          {!loading &&
            (daycares.length === 0 ? (
              <EmptyState emptyStateText={"No Daycares Found"} />
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                {daycares.map((daycare) => (
                  <DaycareCard daycare={daycare} />
                ))}
              </ul>
            ))}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
