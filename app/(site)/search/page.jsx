"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { searchDaycares } from "./actions";
import Image from "next/image";
import NavBar from "../components/NavBar";
import EmptyState from "../components/EmptyState";
import { format } from "path";


function formatDate(dateCreated) {
  // Format the date to "12 Oct" format
  const formattedDate = dateCreated.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short'
  });

  // Calculate the difference in days
  const today = new Date();
  const timeDifference = today - dateCreated;
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (dayDifference === 0) {
    return "Today";
  }

  // Combine the formatted date and the difference in days
  return `${formattedDate} (${dayDifference} days ago)`;
}


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
                  <li
                    key={daycare.id}
                    className="
                border 
                border-gray-300 
                rounded-2xl 
                shadow-xl 
                hover:shadow-2xl
                hover:bg-timberwolf-50
                group
                relative
                overflow-hidden
                
              "
                  >
                    <a
                      href={`/${daycare.slug}`}
                      className="grid md:grid-cols-2 md:auto-cols-max relative h-full"
                    >
                      <Image
                        src={daycare.images[0]}
                        alt={daycare.name}
                        className="h-full object-cover bg-center bg-no-repeat "
                        width={600}
                        height={600}
                      />

                      <div className="flex flex-col gap-4 p-5">
                        {/* Heading and meta */}
                        <div className="flex flex-col">
                          <h2 className=" group-hover:underline text-xl">
                            {daycare.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {daycare.licensingStatus
                              ? "Licensed"
                              : "Unlicensed"}{" "}
                            daycare in {daycare.city}, {daycare.state}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="flex flex-col">
                          <p className="text-4xl font-bold text-gray-600">
                            {
                              daycare.daycareSpots[
                                daycare.daycareSpots.length - 1
                              ].pricePerMonth
                            }{" "}
                            <span className="text-sm text-gray-700">
                              per month
                            </span>
                          </p>
                        </div>

                        {/*  General Info about the Daycare */}
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-700">
                            Spots available:{" "}
                            {
                              daycare.daycareSpots[
                                daycare.daycareSpots.length - 1
                              ].spotsAvailable
                            }
                          </p>

                          <p className="text-sm text-gray-700">
                            Ages:{" "}
                            {
                              daycare.daycareSpots[
                                daycare.daycareSpots.length - 1
                              ].minAgeMonths
                            }{" "}
                            months -{" "}
                            {
                              daycare.daycareSpots[
                                daycare.daycareSpots.length - 1
                              ].maxAgeYears
                            }{" "}
                            years
                          </p>
                          <p className="text-sm text-gray-700">
                            posted:{" "}
                            {
                              formatDate(
                                daycare.daycareSpots[
                                  daycare.daycareSpots.length - 1
                                ].date_created
                              )
                            }
                          </p>
                        </div>

                        {/* Action */}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
