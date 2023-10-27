"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import debounce from "lodash.debounce";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CitySelector({ onCitySelect, showLabel = true }) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]); // List of cities
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      onCitySelect(selectedCity);  
    }
  }, [selectedCity, query, onCitySelect]);

  const fetchCities = useCallback(
    debounce((query) => {
      setIsLoading(true);

      fetch("/api/locations/cities?query=" + query)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data: ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500),
    [],
  );

  useEffect(() => {
    if (query.length >= 3) {
      fetchCities(query);
    }
  }, [query, fetchCities]);

  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) => {
          return city.cityName.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" className=" w-full" value={selectedCity} onChange={setSelectedCity}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {showLabel && "City"}
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(city) => city?.cityName}
          placeholder="Type to search for a city"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredCities.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCities.map((city) => (
              <Combobox.Option
                key={city.id}
                value={city}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-timberwolf-100 text-gray-900" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {city.cityName}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? " text-gray-400" : "text-gray-500",
                        )}
                      >
                        {city.provinceName}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-gray-900" : "text-flame-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {filteredCities.length === 0 && query.length >= 3 && !isLoading && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900">
              No city found
            </Combobox.Option>
          </Combobox.Options>
        )}

        {isLoading && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900">
              Loading...
            </Combobox.Option>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
