"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { signIn } from "next-auth/react"
import Link from "next/link";

const registerOptions = [
  {
    id: 1,
    title: "Join as a Parent",
    description: "Find, compare and contact daycares near you",
  },
  {
    id: 2,
    title: "Join as a Daycare Owner",
    description: "Create an online presence for your daycare and get discovered by thousands of parents.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const [selectedRegisterOption, setSelectedRegisterOption] = useState(
    registerOptions[0]
  );

  return (
    <div className="mx-auto  px-4 sm:px-6 lg:px-8 min-h-screen flex items-center bg-timberwolf-50 ">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl bg-white p-10 border border-gray-200 rounded-md flex flex-col items-stretch shadow-sm">
        <RadioGroup
          value={selectedRegisterOption}
          onChange={setSelectedRegisterOption}
          className="flex flex-col"
        >
          <RadioGroup.Label className="text-base font-semibold text-center w-full leading-6 text-gray-900 pb-5">
            <h1 className="text-xl bold">Join as a Parent or Daycare Owner</h1>
            <p>Select a mailing list</p>
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {registerOptions.map((registerOption) => (
              <RadioGroup.Option
                key={registerOption.id}
                value={registerOption}
                className={({ active }) =>
                  classNames(
                    active
                      ? "border-gray-600 ring-2 ring-gray-600"
                      : "border-gray-300",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {registerOption.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {registerOption.description}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={classNames(
                        !checked ? "invisible" : "",
                        "h-5 w-5 text-gray-600"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-gray-600" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <Link
          className="py-3 px-8 text-white bg-gray-900 hover:bg-gray-700 rounded-md mt-8 text-center"
          href={
            selectedRegisterOption === registerOptions[0]
              ? "/register/parent"
              : "/register/daycare"
          }
        >
          Create Account
        </Link>
        <p className="text-gray-600 text-center w-full pt-4">
          Already have an account 
          <Link href="/login" className="pl-1 text-gray-900 hover:text-gray-700 hover:font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
