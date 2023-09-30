"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateProfileForm({ session }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
    username: "",
    phone: "",
    imageAlt: "",
    bio: "",
    highlights: [],
    city: "",
    state: "",
  });

  async function createProfile(e) {
    e.preventDefault();
    console.log(`Session: ${session}`);
    console.log(`User Data: ${userData}`);

    const body = {
      name: userData.name,
      email: session.user.email,
      image: userData.image,
      username: userData.username,
      phone: userData.phone,
      imageAlt: userData.name,
      bio: userData.bio,
      highlights: userData.highlights,
      city: userData.city,
      state: userData.state,
    };

    axios
      .post("/api/create-profile", body)
      .then(() => toast.success("Profile created successfully"))
      .then(() => {
        // wait 3 seconds before redirecting
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      })
      .catch((e) => {
        toast.error("Profile creation failed", e);
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
        image: session.user.image,
      }));
    }
  }, [session]);

  return (
    <form onSubmit={createProfile}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly on your profile.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    agentfolio.co/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Must be unique, and only contain letters, numbers,
                </p>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      bio: e.target.value,
                    }))
                  }
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {session ? (
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={session.user.image}
                    alt={session.user.name}
                    width={48}
                    height={48}
                  />
                ) : (
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <input
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  type="file"
                  name="photo"
                  id="photo"
                  autoComplete="photo"
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      image: e.target.files[0], // Get the actual File object from the input
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-3">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={userData.country}
                  onChange={(e) =>
                    setUserData((prevState) => ({
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

            <div className="sm:col-span-2 sm:col-start-1">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.city}
                  onChange={(e) =>
                    setUserData((prevState) => ({
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userData.state}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      state: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900">
                  Highlights
                </legend>
                <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
                  <div>
                    <label htmlFor="First Highlight" className="sr-only">
                      First Highlight
                    </label>
                    <input
                      type="text"
                      name="First Highlight"
                      id="First Highlight"
                      className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="First Highlight"
                      value={userData.firstHighlight}
                      onChange={(e) => {
                        setUserData((prevState) => ({
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
                        className="relative block w-full rounded-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Second Highlight"
                        value={userData.secondHighlight}
                        onChange={(e) => {
                          setUserData((prevState) => ({
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
                        className="relative block w-full rounded-none   border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Third Highlight"
                        value={userData.thirdHighlight}
                        onChange={(e) => {
                          setUserData((prevState) => ({
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
                        className="relative block w-full rounded-none  border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Fourth Highlight"
                        value={userData.fourthHighlight}
                        onChange={(e) => {
                          setUserData((prevState) => ({
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
                        className="relative block w-full rounded-none rounded-bl-md rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Fifth Highlight"
                        value={userData.fifthHighlight}
                        onChange={(e) => {
                          setUserData((prevState) => ({
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
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
