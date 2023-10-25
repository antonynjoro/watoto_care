import Link from "next/link";
import { fetchAllDaycareCities } from "./actions";
import NavBar from "../components/NavBar";
import BreadCrumbs from "../components/BreadCrumbs";

async function CityPage() {
  const cities = await fetchAllDaycareCities()

  console.log(cities)

  return (
    <div
    className="min-h-full"
    fallback={
      <div className="  flex min-h-screen flex-col items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    }
  >
    {/* Page header */}
    <NavBar />

    {/* Body */}
    <main className="py-10">
      {/* Main container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="pb-6">
          <BreadCrumbs
            pages={[
              { name: "Cities", href: "/city", current: true },
            ]}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Find a Daycare in your City
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
        <ul className="flex flex-col space-y-4">
        {cities.map(city => {
        return (
          <li className="">
          <Link 
            href={`/city/${city.slug}`}
            key={city.slug}
            className="text-gray-900 hover:text-flame-700 hover:underline font-semibold text-lg"
          >
            {city.cityName}
          </Link>
          </li>
        )
      })}
        </ul>
       
        </div>
      </div>
    </main>
  </div>
);
      
}

export default CityPage