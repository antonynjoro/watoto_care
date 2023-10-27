import Link from "next/link";
import Image from "next/image";
import formatDate from "../../utils/formatDate";
import { MdOutlineChildCare } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { TbLicense, TbLicenseOff } from "react-icons/tb";

export default function DaycareCard({ daycare }) {
  return (
    <div
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
      <Link
        href={`/${daycare.slug}`}
        className="grid md:grid-cols-3 md:auto-cols-max relative h-full "
      >
        <Image
          src={daycare.images[0]}
          alt={daycare.name}
          className="h-full  object-cover bg-center bg-no-repeat "
          width={600}
          height={600}
        />
        
        <div
          className={`text-sm flex gap-1 items-center ${
            daycare.licensingStatus && "text-green-800 font-medium"
          } text-gray-500 py-2 px-3 bg-white shadow-sm absolute left-0 top-0 rounded-br-md`}
        >
            {daycare.licensingStatus ? (
                <>
                <TbLicense/>
                <p>Licenced</p>
                </>
            ) : (
                <>
                <TbLicenseOff/>
                <p>Unlicenced</p>
                </>
            )
            
            }
        </div>

        <div className="flex flex-col gap-5 p-5 md:col-span-2">
          {/* Heading and meta */}
          <div className="flex flex-col">
            <h2 className="text-xl">{daycare.name}</h2>
            <p className="text-sm text-gray-500">
              {daycare.neighborhood} • {daycare.cityName} • {daycare.state}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-gray-600">
              $
              {
                daycare.daycareSpots[daycare.daycareSpots.length - 1]
                  .pricePerMonth
              }{" "}
              <span className="text-sm text-gray-700">
                {daycare.country === "CANADA" ? "CAD" : "USD"} per month
              </span>
            </p>
          </div>

          {/*  General Info about the Daycare */}

          <div className="flex gap-x-4 gap-y-1 flex-wrap">
            <div className="flex gap-1 items-center">
              <HiOutlineTicket className="text-gray-700" />
              <p className="text-sm text-gray-700">
                Spots available:{" "}
                {
                  daycare.daycareSpots[daycare.daycareSpots.length - 1]
                    .spotsAvailable
                }
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <MdOutlineChildCare className="text-gray-700" />
              <p className="text-sm text-gray-700">
                Ages:{" "}
                {
                  daycare.daycareSpots[daycare.daycareSpots.length - 1]
                    .minAgeMonths
                }{" "}
                months -{" "}
                {
                  daycare.daycareSpots[daycare.daycareSpots.length - 1]
                    .maxAgeYears
                }{" "}
                years
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-1">
            <button
              href={`/${daycare.slug}`}
              className=" 
                            flex
                            justify-center
                            border
                            border-gray-500 
                            rounded-md 
                            bg-white 
                            hover:bg-timberwolf-100 
                            text-gray-900 
                            py-2 
                            px-8
                          "
            >
              View Details
            </button>
            <p className="text-sm text-gray-400">
              Posted:{" "}
              {formatDate(
                daycare.daycareSpots[daycare.daycareSpots.length - 1]
                  .date_created
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}


