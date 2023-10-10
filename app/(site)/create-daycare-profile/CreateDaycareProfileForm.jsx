"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { ImageUploadZone } from "../components/UploadThingWidgets";
import DaycareImage from "./DaycareImage";

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
    country: "",
    zip: "",
    website: "",
    description: "",
    highlights: [],
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [daycareImages, setDaycareImages] = useState([
    "https://lh3.googleusercontent.com/a/ACg8ocK9m_VrjjYOAhIWYRU2AxwWmK9DfXrbPJs46crBfByvx7-J=s1000-c",
  ]);

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
    };

    axios
      .post("/api/create-daycare-profile", body)
      .then(() => toast.success("Daycare created successfully"))
      .then(() => {
        // wait 3 seconds before redirecting
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      })
      .catch((e) => {
        toast.error("Daycare creation failed", e);
        console.error(e);
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
                    placeholder="janesmith"
                    value={dayCareData.slug}
                    onChange={(e) =>
                      setDayCareData((prevState) => ({
                        ...prevState,
                        slug: e.target.value,
                      }))
                    }
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
                  defaultValue={""}
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
            <div className="flex flex-row wrap gap-4 my-4">
              {daycareImages &&
                daycareImages.map((imageUrl) => (
                  <DaycareImage
                    imageUrl={imageUrl}
                    imageAlt={dayCareData.name}
                    key={imageUrl}
                    deleteImage={deleteImage}
                  />
                ))}
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
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Neighborhood
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
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
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Zip / Postal Code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
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
                  <option>United States</option>
                  <option>Canada</option>
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
          className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
