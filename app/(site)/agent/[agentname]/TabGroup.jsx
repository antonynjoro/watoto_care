
"use client"

import { Tab } from "@headlessui/react";
import { Fragment } from "react";



function classNames(...classes) {
return classes.filter(Boolean).join(" ");
}


export default function TabGroup({testimonials, faqs, license}){
    const randomNumber = () => Math.floor(Math.random() * 70) + 1;
    return(
        <Tab.Group as="div">
        <div className="border-b border-gray-200 sticky top-0 bg-white">
          <Tab.List className="-mb-px flex space-x-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-flame-600 text-flame-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              Customer Testimonials
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-flame-600 text-flame-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              FAQ
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-flame-600 text-flame-600"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                  "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                )
              }
            >
              Working With Me
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel className="-mb-10">
            <h3 className="sr-only">Customer Testimonials</h3>

            {testimonials.featured.map((review, reviewIdx) => (
              <div
                key={review.id}
                className="flex space-x-4 text-sm text-gray-500"
              >
                <div className="flex-none py-10">
                  <img
                    // src={`${review.avatarSrc}`}
                    src={`${review.avatarSrc}?img=${randomNumber()}`}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                </div>
                <div
                  className={classNames(
                    reviewIdx === 0 ? "" : "border-t border-gray-200",
                    "py-10"
                  )}
                >
                  <h3 className="font-medium text-gray-900">
                    {review.author}
                  </h3>
                  <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p>

                  <div
                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                  <p className="mt-4 text-gray-500">
                    Type: {review.type}
                  </p>
                  <p className="mt-4 text-gray-500">
                    Property Value: {review.propertyValue}
                  </p>
                  <p className="mt-4 text-gray-500">
                    Location: {review.location}
                  </p>
                  <p className="mt-4 text-gray-500">
                    Duration: {review.duration}
                  </p>
                </div>
              </div>
            ))}
          </Tab.Panel>

          <Tab.Panel className="text-sm text-gray-500">
            <h3 className="sr-only">Frequently Asked Questions</h3>

            <dl>
              {faqs.map((faq) => (
                <Fragment key={faq.question}>
                  <dt className="mt-10 font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                    <p>{faq.answer}</p>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </Tab.Panel>

          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Working With Me</h3>

            <div
              className="prose prose-sm max-w-none text-gray-500"
              dangerouslySetInnerHTML={{ __html: license.content }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    )
}