"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { ImageUploadZone, ImageUploadButton } from "../components/UploadThingWidgets";
import DaycareImage from "./DaycareImage";
import TitleDescriptionToggle from "../components/TitleDescriptionToggle";

export default function CreateDaycareProfileForm({ session }) {
  const [dayCareData, setDayCareData] = useState({
    name: "",
    email: "",
    phone: "",
    slug: "",
    address: "",
    city: "",
    neighborhood: "",
    state: "",
    country: "CANADA",
    zip: "",
    website: "",
    licensingStatus: false,
    description: "",
    highlights: [],
    openingTime: "08:00 AM",
    closingTime: "05:00 PM",
    firstDay: "Monday",
    lastDay: "Friday",
    capacity: 2,
    minimumAgeMonths: 0,
    maximumAgeYears: 12,
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [daycareImages, setDaycareImages] = useState([]);

  const sanitizeSlug = (input) => {
    // Convert to lowercase first
    let lowerCased = input.toLowerCase();
    
    // Remove spaces and symbols, keeping only alphanumeric characters
    return lowerCased.replace(/[^a-z0-9]/g, '');
  }



  function deleteImage(imageUrl) {
    setDaycareImages((prevState) => {
      const newState = prevState.filter((image) => image !== imageUrl);
      return newState;
    });
  }

  async function createDaycare(e) {
    e.preventDefault();
    console.log(`Session: ${session}`);
    console.log(`Daycare Data: ${dayCareData}`);

    const body = {
      slug: dayCareData.slug,
      description: dayCareData.description,
      licensingStatus: dayCareData.licensingStatus,
      name: dayCareData.name,
      email: dayCareData.email,
      phone: dayCareData.phone,
      neighborhood: dayCareData.neighborhood,
      city: dayCareData.city,
      state: dayCareData.state,
      country: dayCareData.country,
      zip: dayCareData.zip,
      images: daycareImages,
      highlights: dayCareData.highlights,
      ownerName: userData.name,
      ownerEmail: userData.email,
      ownerPhoto: session.user.image,
      openingTime: dayCareData.openingTime,
      closingTime: dayCareData.closingTime,
      firstDay: dayCareData.firstDay,
      lastDay: dayCareData.lastDay,
      capacity: dayCareData.capacity,
      minimumAgeMonths: dayCareData.minimumAgeMonths,
      maximumAgeYears: dayCareData.maximumAgeYears,
    };



    axios
      .post("/api/create-daycare-profile", body)
      .then(() => toast.success("Daycare created successfully"))
      .then(() => {
        // wait 3 seconds before redirecting
        setTimeout(() => {
          window.location.href = "/dashboard/post-spot";
        }, 3000);
      })
      .catch((e) => {
        toast.error(`Daycare creation failed, ${e.response.data}`);
        console.error(e.response.data);
      });
  }

  useEffect(() => {
    console.log(`Session: ${JSON.stringify(session)}`);
    if (session) {
      setUserData((prevState) => ({
        ...prevState,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, [session]);



  return (
    <form onSubmit={createDaycare}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600">
            The information you put here will be displayed on your daycare's
            profile page.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Daycare Link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    watoto.care/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="totzdaycare"
                    value={dayCareData.slug}
                    onChange={(e) => {
                      const sanitizedValue = sanitizeSlug(e.target.value);
                      setDayCareData((prevState) => ({
                        ...prevState,
                        slug: sanitizedValue,
                      }));
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Must be unique, and only contain letters, numbers,
                </p>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Daycare's Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="daycare-name"
                  id="daycare-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.name}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="licencing-status"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Is your daycare licenced?
              </label>
              <div className="mt-2">
                <label htmlFor="licensing-status" className=" sr-only">
                  Licensing Status:
                </label>
                <select
                  id="licensing-status"
                  name="licensing-status"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  sm:text-sm sm:leading-6"
                  value={dayCareData.licensingStatus.toString()}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      licensingStatus: e.target.value === "true",
                    }))
                  }
                >
                  <option value="false">No. It is not yet Licenced</option>
                  <option value="true">Yes. It is Licenced.</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col col-span-3">
              <p className=" text-sm">Hours of Operation</p>
              <div className="flex gap-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="opening-hours"
                    className=" sr-only block text-sm font-medium leading-6 text-gray-900"
                  >
                    Opening Hours
                  </label>
                  <div className="mt-2">
                    <label htmlFor="opening-hours" className="sr-only">
                      Opening Hours:
                    </label>
                    <select
                      id="opening-hours"
                      name="opening-hours"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      value={dayCareData.openingTime}
                      onChange={(e) =>
                        setDayCareData((prevState) => ({
                          ...prevState,
                          openingTime: e.target.value,
                        }))
                      }
                    >
                      <option value="00:00 AM">12:00 AM</option>
                      <option value="00:30 AM">12:30 AM</option>
                      <option value="01:00 AM">01:00 AM</option>
                      <option value="01:30 AM">01:30 AM</option>
                      <option value="02:00 AM">02:00 AM</option>
                      <option value="02:30 AM">02:30 AM</option>
                      <option value="03:00 AM">03:00 AM</option>
                      <option value="03:30 AM">03:30 AM</option>
                      <option value="04:00 AM">04:00 AM</option>
                      <option value="04:30 AM">04:30 AM</option>
                      <option value="05:00 AM">05:00 AM</option>
                      <option value="05:30 AM">05:30 AM</option>
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="06:30 AM">06:30 AM</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="07:30 AM">07:30 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="01:30 PM">01:30 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                      <option value="10:30 PM">10:30 PM</option>
                      <option value="11:00 PM">11:00 PM</option>
                      <option value="11:30 PM">11:30 PM</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="closing-hours"
                    className=" sr-only block text-sm font-medium leading-6 text-gray-900"
                  >
                    Closing Hours
                  </label>
                  <div className="mt-2">
                    <label htmlFor="closing-hours" className="sr-only">
                      Closing Hours:
                    </label>
                    <select
                      id="closing-hours"
                      name="closing-hours"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      value={dayCareData.closingTime}
                      onChange={(e) =>
                        setDayCareData((prevState) => ({
                          ...prevState,
                          closingTime: e.target.value,
                        }))
                      }
                    >
                      <option value="12:00 AM">12:00 AM</option>
                      <option value="12:30 AM">12:30 AM</option>
                      <option value="01:00 AM">01:00 AM</option>
                      <option value="01:30 AM">01:30 AM</option>
                      <option value="02:00 AM">02:00 AM</option>
                      <option value="02:30 AM">02:30 AM</option>
                      <option value="03:00 AM">03:00 AM</option>
                      <option value="03:30 AM">03:30 AM</option>
                      <option value="04:00 AM">04:00 AM</option>
                      <option value="04:30 AM">04:30 AM</option>
                      <option value="05:00 AM">05:00 AM</option>
                      <option value="05:30 AM">05:30 AM</option>
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="06:30 AM">06:30 AM</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="07:30 AM">07:30 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="01:30 PM">01:30 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                      <option value="10:30 PM">10:30 PM</option>
                      <option value="11:00 PM">11:00 PM</option>
                      <option value="11:30 PM">11:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-3">
              <p className=" text-sm">Days</p>
              <div className="flex gap-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="first-day"
                    className=" sr-only block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Day
                  </label>
                  <div className="mt-2">
                    <label htmlFor="first-day" className="sr-only">
                      First Day:
                    </label>
                    <select
                      id="first-day"
                      name="first-day"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      value={dayCareData.firstDay}
                      onChange={(e) =>
                        setDayCareData((prevState) => ({
                          ...prevState,
                          firstDay: e.target.value,
                        }))
                      }
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="last-day"
                    className=" sr-only block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Day
                  </label>
                  <div className="mt-2">
                    <label htmlFor="last-day" className="sr-only">
                      Last Day:
                    </label>
                    <select
                      id="last-day"
                      name="last-day"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      value={dayCareData.lastDay}
                      onChange={(e) =>
                        setDayCareData((prevState) => ({
                          ...prevState,
                          lastDay: e.target.value,
                        }))
                      }
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="minimum-age-months"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum age in Months
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="minimum-age-months"
                  id="minimum-age-months"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  min={0}
                  max={48}
                  value={dayCareData.minimumAgeMonths}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      minimumAgeMonths: parseInt(e.target.value, 10) || 0, 
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="maximum-age-years"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum age in Years
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="maximum-age-years"
                  id="maximum-age-years"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  min={0}
                  max={12}
                  value={dayCareData.maximumAgeYears}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      maximumAgeYears: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Capacity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min={1}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.capacity}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      capacity: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.description}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Describe in detail how your daycare operates, what makes it
                unique, and what parents can expect.
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Photos
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add photos of your daycare to help parents get a feel for your
            daycare.
          </p>
          <div className="flex flex-col items-stretch">
            <ImageUploadZone setImageUrls={setDaycareImages} />
            <div className="flex flex-row flex-wrap gap-4 my-4">
              {daycareImages &&
                daycareImages.map((imageUrl) => (
                  <DaycareImage
                    imageUrl={imageUrl}
                    imageAlt={dayCareData.name}
                    key={imageUrl}
                    deleteImage={deleteImage}
                  />
                ))}
              {daycareImages <= 3 && (
                <p className="text-red-800 text-xs font-medium">
                  Please upload at least 3 images
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Contact Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Details about your daycare's location and contact information.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 content-stretch">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Daycare's Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.email}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Add an email address if it's different from your personal email.
              </p>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Daycare's Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.phone}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="neighborhood"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Neighborhood
              </label>
              <div className="mt-2">
                <input
                  id="neighborhood"
                  name="neighborhood"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.neighborhood}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      neighborhood: e.target.value,
                    }))
                  }
                />
              </div>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                The name of your neighborhood or area.
              </p>
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.city}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      city: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.state}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      state: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="zip"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Zip / Postal Code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={dayCareData.zip}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      zip: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600  sm:text-sm sm:leading-6"
                  value={dayCareData.country}
                  onChange={(e) =>
                    setDayCareData((prevState) => ({
                      ...prevState,
                      country: e.target.value,
                    }))
                  }
                >
                  <option value="USA">United States</option>
                  <option value="CANADA">Canada</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-full">
              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900">
                  Highlights
                </legend>
                <p className="mt-1 text-xs leading-6 text-gray-600">
                  Add up to 5 highlights that describe your daycare and what
                  makes it unique.
                </p>
                <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
                  <div>
                    <label htmlFor="First Highlight" className="sr-only">
                      First Highlight
                    </label>
                    <input
                      type="text"
                      name="First Highlight"
                      id="First Highlight"
                      className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      placeholder="First Highlight"
                      value={dayCareData.firstHighlight}
                      onChange={(e) => {
                        setDayCareData((prevState) => ({
                          ...prevState,
                          highlights: [...prevState.highlights, e.target.value],
                        }));
                      }}
                    />
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2 min-w-0 flex-1">
                      <label htmlFor="Second Highlight" className="sr-only">
                        Second Highlight
                      </label>
                      <input
                        type="text"
                        name="Second Highlight"
                        id="second-highlight"
                        className="relative block w-full rounded-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        placeholder="Second Highlight"
                        value={dayCareData.secondHighlight}
                        onChange={(e) => {
                          setDayCareData((prevState) => ({
                            ...prevState,
                            highlights: [
                              ...prevState.highlights,
                              e.target.value,
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2 min-w-0 flex-1">
                      <label htmlFor="Third Highlight" className="sr-only">
                        Third Highlight
                      </label>
                      <input
                        type="text"
                        name="Third Highlight"
                        id="third-highlight"
                        className="relative block w-full rounded-none   border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        placeholder="Third Highlight"
                        value={dayCareData.thirdHighlight}
                        onChange={(e) => {
                          setDayCareData((prevState) => ({
                            ...prevState,
                            highlights: [
                              ...prevState.highlights,
                              e.target.value,
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2 min-w-0 flex-1">
                      <label htmlFor="Fourth Highlight" className="sr-only">
                        Fourth Highlight
                      </label>
                      <input
                        type="text"
                        name="Fourth Highlight"
                        id="fourth-highlight"
                        className="relative block w-full rounded-none  border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        placeholder="Fourth Highlight"
                        value={dayCareData.fourthHighlight}
                        onChange={(e) => {
                          setDayCareData((prevState) => ({
                            ...prevState,
                            highlights: [
                              ...prevState.highlights,
                              e.target.value,
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2 min-w-0 flex-1">
                      <label htmlFor="Fifth Highlight" className="sr-only">
                        Fifth Highlight
                      </label>
                      <input
                        type="text"
                        name="Fifth Highlight"
                        id="fifth-highlight"
                        className="relative block w-full rounded-none rounded-bl-md rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        placeholder="Fifth Highlight"
                        value={dayCareData.fifthHighlight}
                        onChange={(e) => {
                          setDayCareData((prevState) => ({
                            ...prevState,
                            highlights: [
                              ...prevState.highlights,
                              e.target.value,
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
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
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
