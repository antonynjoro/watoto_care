"use client";

import { Fragment, useState, useEffect, use } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { HiMiniUser } from "react-icons/hi2";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import isOwnerFullyRegistered from "./isOwnerFullyRegistered";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  {
    name: "Sign out",
    href: "#",
    onClickFunction: () => signOut({ callbackUrl: "/" }),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkedRegistration, setCheckedRegistration] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkRegistration = async () => {
      if (status === "authenticated" && !checkedRegistration) {
        if (session?.user?.email) {
          const isRegistered = await isOwnerFullyRegistered(session.user.email);
          console.log("isRegistered: ", isRegistered);
          if (isRegistered === false) {
            toast.error("Please complete your registration before continuing.");
            router.push("/create-daycare-profile");
          }
          setCheckedRegistration(true);
        }
      }
    };
  
    checkRegistration();
  }, [status, session]);
  

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-charcoal-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/landscape-logo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-charcoal-50 text-flame-600"
                                      : "text-charcoal-700 hover:bg-charcoal-50 hover:text-flame-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-flame-600"
                                        : "text-charcoal-400 group-hover:text-flame-600",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-charcoal-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-charcoal-50 text-flame-600"
                                      : "text-charcoal-700 hover:bg-charcoal-50 hover:text-flame-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "border-flame-600 text-flame-600"
                                        : "border-charcoal-200 text-charcoal-400 group-hover:border-flame-600 group-hover:text-flame-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <Link
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-charcoal-700 hover:bg-charcoal-50 hover:text-flame-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-charcoal-400 group-hover:text-flame-600"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-charcoal-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/landscape-logo.svg"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-charcoal-50 text-flame-800"
                              : "text-charcoal-700 hover:bg-charcoal-50 hover:text-flame-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-flame-800"
                                : "text-timberwolf-600 group-hover:text-flame-800",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <Link
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-charcoal-700 hover:bg-charcoal-50 hover:text-flame-800"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-timberwolf-400 group-hover:text-flame-800"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-charcoal-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-charcoal-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-charcoal-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-charcoal-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-charcoal-900 placeholder:text-charcoal-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-charcoal-400 hover:text-charcoal-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-charcoal-200"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}

                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {!session ? (
                      <HiMiniUser size={"36px"} className="h8 w-8" />
                    ) : (
                      <Image
                        className="h-8 w-8 rounded-full bg-charcoal-50"
                        src={session.user.image}
                        alt=""
                        width={32}
                        height={32}
                      />
                    )}
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-charcoal-900"
                        aria-hidden="true"
                      >
                        {!session ? "Loading..." : session.user.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-charcoal-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-charcoal-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-charcoal-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-charcoal-900",
                              )}
                              onClick={item.onClickFunction}
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

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
