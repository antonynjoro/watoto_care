import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import NavBar from "../../components/NavBar";
import { notFound } from "next/navigation";
import DaycareCard from "../../components/DaycareCard";
import getCityDaycares from "../actions";
import BreadCrumbs from "../../components/BreadCrumbs";
import EmptyState from "../../components/EmptyState";

export default async function CityPage({ params }) {
  const { cityName } = params;

  const daycares = await getCityDaycares(cityName);

  console.log("daycares");
  console.log(daycares);

  if (daycares === undefined || daycares.length === 0 || daycares === null) {
    return (
      <div className="min-h-full">
        {/* Page header */}
        <NavBar />
        <EmptyState emptyStateText={`No daycare listed from ${cityName}`} />
      </div>
    );
  }

  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

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
                { name: "Cities", href: "/city", current: false },
                { name: formattedCityName, href: "#", current: true },
              ]}
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Daycares in {formattedCityName}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
            {daycares.map((daycare) => (
              <DaycareCard daycare={daycare} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
