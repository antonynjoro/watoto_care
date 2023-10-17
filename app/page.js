"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Find a Daycare", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80",
    alt: "Two each of charcoal, white, and black shirts laying flat.",
  },
  {
    src: "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3440&q=80",
    alt: "Model wearing plain black basic tee.",
  },
  {
    src: "https://images.unsplash.com/flagged/photo-1570319736696-894f69f52bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80g",
    alt: "Model wearing plain charcoal basic tee.",
  },
  {
    src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
    alt: "Model wearing plain white basic tee.",
  },
];

const daycare = {
  description: `
    <p>At our daycare, every child is given the chance to explore, learn, and grow in a nurturing environment. Our dedicated staff provides age-appropriate activities designed to stimulate creativity and foster a love for learning. Each child's safety and comfort are our top priorities, ensuring parents have peace of mind.</p>
    <p>Interested in extended care? We offer half-day and full-day programs to suit your schedule. Enroll your child and watch them flourish.</p>
  `,
  details: [
    "Qualified and experienced staff",
    "Child-safe facilities",
    "Age-appropriate learning materials",
    "Healthy meals and snacks provided",
    "Structured daily routines with plenty of playtime",
    "Licensed and inspected regularly",
  ],
};

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function dayCarePage() {
  return (
    <>
      <div className="min-h-full">
        {/* Header */}
        <Disclosure as="header" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-charcoal-200 lg:px-8">
                <div className="relative flex h-16 justify-between">
                  <div className="relative z-10 flex px-2 lg:px-0">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=charcoal&shade=600"
                        alt="Your Company"
                      />
                    </div>
                  </div>

                  <div className="relative z-0 flex flex-1 items-center justify-center lg:justify-between px-2 sm:inset-0">
                    <nav
                      className="hidden lg:flex lg:space-x-8 lg:py-2 px-4"
                      aria-label="Global"
                    >
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-charcoal-100 text-charcoal-900"
                              : "text-charcoal-900 hover:bg-charcoal-50 hover:text-charcoal-900",
                            "inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                    <div className="w-full sm:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-charcoal-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-charcoal-900 ring-1 ring-inset ring-charcoal-300 placeholder:text-charcoal-400 focus:ring-2 focus:ring-inset focus:ring-charcoal-600 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-charcoal-400 hover:bg-charcoal-100 hover:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-charcoal-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                    <button
                      type="button"
                      className="relative flex-shrink-0 rounded-full bg-white p-1 text-charcoal-400 hover:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-charcoal-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-charcoal-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-charcoal-100" : "",
                                    "block px-4 py-2 text-sm text-charcoal-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel
                as="nav"
                className="lg:hidden"
                aria-label="Global"
              >
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-charcoal-100 text-charcoal-900"
                          : "text-charcoal-900 hover:bg-charcoal-50 hover:text-charcoal-900",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-charcoal-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-charcoal-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-charcoal-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-charcoal-400 hover:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-charcoal-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Body */}
        <main className="py-10">
          {/* Main container */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Image gallery */}
            <div className="relative mx-auto max-w-full  lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-4 md:items-stretch flex overflow-hidden rounded-lg">
              <div className="lg:aspect-h-3 lg:aspect-w-4 aspect-w-4 aspect-h-2 w-full    overflow-hidden  lg:block">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-4 lg:gap-x-4">
                <div className="aspect-h-1 aspect-w-4 overflow-hidden ">
                  <img
                    src={images[1].src}
                    alt={images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-1 aspect-w-4 overflow-hidden ">
                  <img
                    src={images[2].src}
                    alt={images[2].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <button className="absolute right-3 bottom-3 inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-charcoal-800 shadow-sm hover:bg-charcoal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-400 border border-charcoal-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
                View All Photos
              </button>
            </div>
            {/* Title and action card */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start pt-4">
              {/* Title of the page */}
              <div className="text-left col-span-2 ">
                <h1 className=" text-xl text-charcoal-900 sm:text-2xl">
                  Unlicenced Daycare in Stonebridge (Saskatoon)
                </h1>

                <div className="group flex items-center mt-2 text-charcoal-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-charcoal-900"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="ml-2 text-base">
                    4.5 Stars • <a className="underline">37 Reviews</a>
                  </p>
                </div>
                {/* Daycare Provider Avatar */}
                <a href="#" className="group block flex-shrink-0 my-6">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-charcoal-700 group-hover:text-charcoal-900">
                        Krystal Bonador
                      </p>
                      <p className="text-sm font-medium text-charcoal-500 group-hover:text-charcoal-700">
                        Last seen 2 hours ago
                      </p>
                    </div>
                  </div>
                </a>

                {/* Amenities */}
                <div className="mt-10 md:grid grid-cols-2 gap-8">
                  <div className="flex items-center border-t border-charcoal-200 p-4 gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <h3 className="text-md text-charcoal-900">
                        Hours: 7:30am - 5:30pm
                      </h3>
                      <p className="text-sm text-charcoal-500 ">Monday - Friday</p>
                    </div>
                  </div>

                  <div className="flex items-center border-t border-charcoal-200 p-4 gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <div className="flex flex-col ">
                      <h3 className="text-md text-charcoal-900">
                        Stonebridge, Saskatoon
                      </h3>
                      <p className="text-sm text-charcoal-500 ">1.5 miles away</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-charcoal-900">
                    Description
                  </h2>

                  <div
                    className="prose prose-sm mt-4 text-charcoal-500"
                    dangerouslySetInnerHTML={{ __html: daycare.description }}
                  />
                </div>

                <div className="mt-8 border-t border-charcoal-200 pt-8">
                  <h2 className="text-sm font-medium text-charcoal-900">
                    Features
                  </h2>

                  <div className="prose prose-sm mt-4 text-charcoal-500">
                    <ul role="list">
                      {daycare.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Action Card */}
              <div className=" px-4 py-5 sm:p-6 col-span-1 overflow-hidden lg:rounded-lg bg-white lg:shadow-xl border-t lg:border z-50 border-charcoal-200 lg:sticky lg:top-4 fixed w-screen lg:w-full bottom-0 left-0 flex flex-col gap-6">
                <h3>
                  <span className=" text-2xl font-medium text-charcoal-900">
                    $800 CAD
                  </span>
                  <span className="text-l font-medium text-charcoal-500">
                    /month
                  </span>
                </h3>
                <div className="flex-col justify-center items-start gap-2 inline-flex">
                  <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-6 h-6 relative">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="teddy-bear">
                          <path
                            id="Vector"
                            d="M15.75 19.13C14.92 19.13 14.25 18.29 14.25 17.25C14.25 16.22 14.92 15.38 15.75 15.38C16.58 15.38 17.25 16.22 17.25 17.25C17.25 18.29 16.58 19.13 15.75 19.13ZM12 11.25C10.76 11.25 9.75 10.41 9.75 9.38C9.75 8.34 10.76 7.5 12 7.5C13.24 7.5 14.25 8.34 14.25 9.38C14.25 10.41 13.24 11.25 12 11.25ZM8.25 19.13C7.42 19.13 6.75 18.29 6.75 17.25C6.75 16.22 7.42 15.38 8.25 15.38C9.08 15.38 9.75 16.22 9.75 17.25C9.75 18.29 9.08 19.13 8.25 19.13ZM12 8.25C12.41 8.25 12.75 8.59 12.75 9C12.75 9.41 12.41 9.75 12 9.75C11.59 9.75 11.25 9.41 11.25 9C11.25 8.59 11.59 8.25 12 8.25ZM18.75 12C18.43 12 18.12 12.07 17.84 12.2C17.36 11.59 16.71 11.07 15.93 10.67C16.5 9.87 16.84 8.9 16.84 7.85C16.84 7.83 16.84 7.81 16.84 7.79C17.93 7.56 18.75 6.59 18.75 5.42C18.75 4.09 17.66 3 16.33 3C15.64 3 15 3.29 14.58 3.75C13.83 3.28 12.95 3 12 3C11.05 3 10.16 3.28 9.42 3.75C9 3.29 8.36 3 7.67 3C6.34 3 5.25 4.09 5.25 5.42C5.25 6.58 6.07 7.55 7.15 7.79C7.15 7.81 7.15 7.83 7.15 7.85C7.15 8.9 7.5 9.88 8.06 10.67C7.29 11.07 6.64 11.59 6.16 12.2C5.88 12.07 5.57 12 5.25 12C4 12 3 13 3 14.25C3 15.5 4 16.5 5.25 16.5C5.27 16.5 5.29 16.5 5.31 16.5C5.27 16.74 5.25 17 5.25 17.25C5.25 19.32 6.59 21 8.25 21C9.26 21 10.15 20.37 10.7 19.41C11.12 19.47 11.55 19.5 12 19.5C12.45 19.5 12.88 19.47 13.3 19.41C13.85 20.37 14.74 21 15.75 21C17.41 21 18.75 19.32 18.75 17.25C18.75 17 18.73 16.74 18.69 16.5C18.71 16.5 18.73 16.5 18.75 16.5C20 16.5 21 15.5 21 14.25C21 13 20 12 18.75 12Z"
                            className=" fill-timberwolf-600"
                          />
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="text-charcoal-700 text-base font-normal">
                        Available Openings:{" "}
                      </span>
                      <span className="text-charcoal-900 text-base font-medium ">
                        3
                      </span>
                    </div>
                  </div>
                  <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-6 h-6 relative">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="human-male-girl">
                          <path
                            id="Vector"
                            d="M7.5 2C8.03043 2 8.53914 2.21071 8.91421 2.58579C9.28929 2.96086 9.5 3.46957 9.5 4C9.5 4.53043 9.28929 5.03914 8.91421 5.41421C8.53914 5.78929 8.03043 6 7.5 6C6.96957 6 6.46086 5.78929 6.08579 5.41421C5.71071 5.03914 5.5 4.53043 5.5 4C5.5 3.46957 5.71071 2.96086 6.08579 2.58579C6.46086 2.21071 6.96957 2 7.5 2ZM6 7H9C9.53043 7 10.0391 7.21071 10.4142 7.58579C10.7893 7.96086 11 8.46957 11 9V14.5H9.5V22H5.5V14.5H4V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7ZM14.5 12C14.5 11.4696 14.7107 10.9609 15.0858 10.5858C15.4609 10.2107 15.9696 10 16.5 10C17.0304 10 17.5391 10.2107 17.9142 10.5858C18.2893 10.9609 18.5 11.4696 18.5 12C18.5 12.5304 18.2893 13.0391 17.9142 13.4142C17.5391 13.7893 17.0304 14 16.5 14C15.9696 14 15.4609 13.7893 15.0858 13.4142C14.7107 13.0391 14.5 12.5304 14.5 12ZM15 15H18L19.5 19H18V22H15V19H13.5L15 15Z"
                            className=" fill-timberwolf-600"
                          />
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="text-charcoal-700 text-base font-normal ">
                        Age Group:{" "}
                      </span>
                      <span className="text-charcoal-900 text-medium font-medium ">
                        8 Months- 5 Years
                      </span>
                    </div>
                  </div>
                  <div className="justify-start items-center gap-2 inline-flex">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="calendar">
                        <path
                          id="Vector"
                          d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3H18V1M17 12H12V17H17V12Z"
                          className=" fill-timberwolf-600"
                        />
                      </g>
                    </svg>
                    <div>
                      <span className="text-charcoal-700 text-base font-normal ">
                        Starting Date:{" "}
                      </span>
                      <span className="text-charcoal-900 text-base font-medium ">
                        September 2023
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-center items-stretch gap-2 inline-flex">
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-charcoal-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-charcoal-600">
                      <label
                        htmlFor="age of child"
                        className="block text-xs font-medium text-charcoal-900"
                      >
                        Age of your child in years
                      </label>
                      <input
                        type="number"
                        name="age of child"
                        min={0}
                        max={13}
                        id="child-age"
                        className="block w-full border-0 p-0 text-charcoal-900 placeholder:text-charcoal-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="2"
                      />
                    </div>
                    <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-charcoal-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-charcoal-600">
                      <label
                        htmlFor="cellphone number"
                        className="block text-xs font-medium text-charcoal-900"
                      >
                        Cellphone Number
                      </label>
                      <input
                        type="tel"
                        name="cellphone number"
                        id="cellphone-number"
                        className="block w-full border-0 p-0 text-charcoal-900 placeholder:text-charcoal-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="306-123-4567"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-500">
                    We'll text the daycare on your behalf to let them know you are interested in a spot. 
                  </p>
                </div>

                <div className="flex-col justify-center items-stretch gap-2 inline-flex">
                  <button
                    type="button"
                    className="rounded-md bg-flame-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-timberwolf-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-600"
                  >
                    Contact Daycare
                  </button>
                  <div className="text-zinc-600 text-xs font-normal font-['Open Sans']">
                    Openings Listed: 15 September 2023
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-bold tracking-tight text-charcoal-900">
                  Customer Reviews
                </h2>

                <div className="mt-3 flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-charcoal-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-charcoal-900">
                    Based on {reviews.totalCount} reviews
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Review data</h3>

                  <dl className="space-y-3">
                    {reviews.counts.map((count) => (
                      <div
                        key={count.rating}
                        className="flex items-center text-sm"
                      >
                        <dt className="flex flex-1 items-center">
                          <p className="w-3 font-medium text-charcoal-900">
                            {count.rating}
                            <span className="sr-only"> star reviews</span>
                          </p>
                          <div
                            aria-hidden="true"
                            className="ml-1 flex flex-1 items-center"
                          >
                            <StarIcon
                              className={classNames(
                                count.count > 0
                                  ? "text-yellow-400"
                                  : "text-charcoal-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />

                            <div className="relative ml-3 flex-1">
                              <div className="h-3 rounded-full border border-charcoal-200 bg-charcoal-100" />
                              {count.count > 0 ? (
                                <div
                                  className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400 z-0"
                                  style={{
                                    width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </dt>
                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-charcoal-900">
                          {Math.round((count.count / reviews.totalCount) * 100)}
                          %
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-medium text-charcoal-900">
                    Share your thoughts
                  </h3>
                  <p className="mt-1 text-sm text-charcoal-600">
                    If you’ve used this product, share your thoughts with other
                    customers
                  </p>

                  <a
                    href="#"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-charcoal-300 bg-white px-8 py-2 text-sm font-medium text-charcoal-900 hover:bg-charcoal-50 sm:w-auto lg:w-full"
                  >
                    Write a review
                  </a>
                </div>
              </div>

              <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <h3 className="sr-only">Recent reviews</h3>

                <div className="flow-root">
                  <div className="-my-12 divide-y divide-charcoal-200">
                    {reviews.featured.map((review) => (
                      <div key={review.id} className="py-12">
                        <div className="flex items-center">
                          <img
                            src={review.avatarSrc}
                            alt={`${review.author}.`}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="ml-4">
                            <h4 className="text-sm font-bold text-charcoal-900">
                              {review.author}
                            </h4>
                            <div className="mt-1 flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? "text-yellow-400"
                                      : "text-charcoal-300",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>
                          </div>
                        </div>

                        <div
                          className="mt-4 space-y-6 text-base italic text-charcoal-600"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
