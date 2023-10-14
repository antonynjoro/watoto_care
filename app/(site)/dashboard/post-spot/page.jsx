"use client";
import PageHeading  from "../components/PageHeadings";
import { handleSave, handleCreateDaycareSpot } from "./logic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function postSpot() {
  const [spotsAvailable, setSpotsAvailable] = useState(1);

  const [minAgeMonths, setMinAgeMonths] = useState(2);
  const [maxAgeYears, setMaxAgeYears] = useState(10);

  const [pricePerMonth, setPricePerMonth] = useState(0);
  const [startingDate, setStartingDate] = useState(new Date());



  const handleMinAgeMonthsChange = (e) => {
    setMinAgeMonths(parseInt(e.target.value, 10) || 0,);
  };

  const handleMaxAgeYearsChange = (e) => {
    setMaxAgeYears(parseInt(e.target.value, 10) || 0,);
  };

  const handleSpotsAvailableChange = (e) => {
    setSpotsAvailable(parseInt(e.target.value, 10) || 0,); 
  };

  const handlePriceChange = (e) => {
    setPricePerMonth(parseInt(e.target.value, 10));
  };

  const handleStartingDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setStartingDate(newDate);
  };


  function formatDate(date) {
  // Adjust time to UTC
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000; // in milliseconds
  const utcTime = new Date(localTime + localOffset);

  const d = utcTime,
    month = "" + (d.getUTCMonth() + 1),
    day = "" + d.getUTCDate(),
    year = d.getUTCFullYear();

  return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
}


  const route = useRouter();

  const session = useSession();

  const [ownerEmail, setOwnerEmail] = useState("");

  useEffect(() => {
    if (session.data) {
      setOwnerEmail(session.data.user.email);
    }
  }, [session]);

  return (
    <>
      <div>
        {/* Page Heading */}
        <PageHeading
          title="Post a spot in your daycare"
          pages={[
            { name: "Dashboard", href: "/dashboard", current: false },
            { name: "Post", href: "#", current: true },
          ]}
          
        />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) =>{
          e.preventDefault();
          handleCreateDaycareSpot(
            spotsAvailable,
            minAgeMonths,
            maxAgeYears,
            pricePerMonth,
            startingDate,
            ownerEmail
          )
        }
        }
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide the the following information to post a spot in your
              daycare.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="spots-available"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Spots Available
                </label>
                <div className="mt-2">
                  <input
                    id="spots-available"
                    name="spots-available"
                    type="number"
                    min="1"
                    className="block w-full sm:w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-timberwolf-600 sm:text-sm sm:leading-6"
                    onChange={handleSpotsAvailableChange}
                    value={spotsAvailable}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="min-age-months"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Minimum Age (Months)
                </label>
                <div className="mt-2">
                  <input
                    id="min-age-months"
                    name="minAgeMonths"
                    type="number"
                    min="0"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-timberwolf-600 sm:text-sm sm:leading-6"
                    value={minAgeMonths}
                    onChange={handleMinAgeMonthsChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="max-age-years"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Maximum Age (Years)
                </label>
                <div className="mt-2">
                  <input
                    id="max-age-years"
                    name="maxAgeYears"
                    type="number"
                    min="0"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-timberwolf-600 sm:text-sm sm:leading-6"
                    value={maxAgeYears}
                    onChange={handleMaxAgeYearsChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="starting-date"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Earliest Start Date
                </label>
                <div className="mt-2">
                  <input
                    id="starting-date"
                    name="startingDate"
                    type="date"
                    value={formatDate(startingDate)}
                    onChange={handleStartingDateChange}
                    className="block w-full sm:w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-timberwolf-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price per Month
                </label>
                <div className="mt-2 flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-timberwolf-50  text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    className="block w-full rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-timberwolf-600 sm:text-sm sm:leading-6"
                    value={pricePerMonth}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
