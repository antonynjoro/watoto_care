"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "./SearchBar";
import Link from "next/link";

const navigation = [
  { name: "Find a Daycare", href: "/", current: true },
  { name: "Search by City", href: "/city", current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];
const userNavigation = [
  { name: "Post a daycare spot", href: "/dashboard/post-spot" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sign out", href: "#", onClick: () => signOut({ callbackUrl: "/" }) },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <Disclosure as="header" className="sticky top-0 z-50 bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-charcoal-200 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    {/* Mobile Logo */}
                    <Image
                      className="h-8 w-auto lg:hidden "
                      src="/logo.svg"
                      alt="Watoto.Care"
                      width={32}
                      height={32}
                    />
                    {/* Desktop Logo */}
                    <Image
                      className="hidden h-8 w-auto lg:block "
                      src="/landscape-logo.svg"
                      alt="Watoto.Care"
                      width={32}
                      height={32}
                    />
                  </Link>
                </div>
              </div>

              <div
                className={`relative z-0 flex flex-1 items-center justify-center lg:justify-between ${
                  session ? "px-2" : "pl-2"
                } sm:inset-0`}
              >
                <nav
                  className="hidden px-4 lg:flex lg:space-x-8 lg:py-2"
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
                        "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                <SearchBar />
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-charcoal-400 hover:bg-charcoal-100 hover:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-charcoal-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {session ? (
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
                          src={session.user.image}
                          alt={session.user.name}
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
                                  "block px-4 py-2 text-sm text-charcoal-700",
                                )}
                                onClick={item.onClick}
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
              ) : (
                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                  <Link
                    href="/login"
                    className="text-charcoal-900 hover:bg-charcoal-50 hover:text-charcoal-900 block rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
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
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {session && (
              <div className="border-t border-charcoal-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={session.user.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-charcoal-800">
                      {session.user.name}
                    </div>
                    <div className="text-sm font-medium text-charcoal-500">
                      {session.user.email}
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
                      className="block rounded-md px-3 py-2 text-base font-medium text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900 focus:ring-charcoal-500 "
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
