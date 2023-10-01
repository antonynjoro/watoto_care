
"use client"

import { Tab } from "@headlessui/react";
import { Fragment } from "react";

const testimonials = {
average: 4.8,
featured: [
    {
    id: 1,
    rating: 5,
    content: `<p>As first-time homebuyers, we had so many questions. Brian was not only patient but also extremely informative. He guided us through every stage of the buying process.</p>`,
    type: "Buying",
    propertyValue: "$320,000",
    location: "Nutana, Saskatoon",
    duration: "1.5 months",
    date: "August 5, 2023",
    datetime: "2023-08-05",
    author: "Sarah Thompson",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 2,
    rating: 4.9,
    content: `<p>Brian listened to what we were looking for in a home and delivered beyond our expectations. The only minor issue was the time it took to get pre-approval, but that was out of his control. We felt heard and respected.</p>`,
    type: "Buying",
    propertyValue: "$290,000",
    location: "Stonebridge, Saskatoon",
    duration: "2 months",
    date: "July 27, 2023",
    datetime: "2023-07-27",
    author: "Mark Peterson",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 3,
    rating: 4.8,
    content: `<p>Brian is a fantastic negotiator. We faced a bit of back-and-forth with the sellers, but his persistence ensured that we got the best deal possible.</p>`,
    type: "Buying",
    propertyValue: "$415,000",
    location: "Lakewood, Saskatoon",
    duration: "1 month",
    date: "June 18, 2023",
    datetime: "2023-06-18",
    author: "Emily Williams",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 4,
    rating: 4.7,
    content: `<p>His experience really shows. Brian had an incredible knack for seeing potential issues and addressing them. Would have loved more options in our price range, but overall highly recommended!</p>`,
    type: "Buying",
    propertyValue: "$330,000",
    location: "Nutana, Saskatoon",
    duration: "2.5 months",
    date: "May 30, 2023",
    datetime: "2023-05-30",
    author: "David Smith",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 5,
    rating: 5,
    content: `<p>We appreciate Brian's clear communication. He made sure we knew what to expect at every turn. No surprises, just excellent service.</p>`,
    type: "Selling",
    propertyValue: "$405,000",
    location: "Westmount, Saskatoon",
    duration: "1 month",
    date: "April 15, 2023",
    datetime: "2023-04-15",
    author: "Nina Patel",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 6,
    rating: 4.6,
    content: `<p>Brian made the stressful process of selling our home a lot more bearable. We did have a delay with paperwork, but his patience and reassurance went a long way.</p>`,
    type: "Selling",
    propertyValue: "$420,000",
    location: "Rosewood, Saskatoon",
    duration: "1.5 months",
    date: "March 12, 2023",
    datetime: "2023-03-12",
    author: "Oliver Green",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 7,
    rating: 5,
    content: `<p>We had a specific vision for our dream home, and Brian was committed to making it a reality. His dedication and hard work paid off for us.</p>`,
    type: "Buying",
    propertyValue: "$520,000",
    location: "Briarwood, Saskatoon",
    duration: "2 months",
    date: "February 9, 2023",
    datetime: "2023-02-09",
    author: "Sophia Lee",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 8,
    rating: 4.9,
    content: `<p>We felt like Brian was on our side every step of the way. His attention to detail was impressive, although we wish the house inspection had been a bit quicker.</p>`,
    type: "Buying",
    propertyValue: "$275,000",
    location: "Pacific Heights, Saskatoon",
    duration: "1 month",
    date: "January 29, 2023",
    datetime: "2023-01-29",
    author: "Liam Johnson",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 9,
    rating: 4.8,
    content: `<p>Brian helped us secure our dream home despite multiple offers. His persistence and negotiating skills are great, although the initial communication was slightly slow.</p>`,
    type: "Buying",
    propertyValue: "$460,000",
    location: "Arbor Creek, Saskatoon",
    duration: "1.5 months",
    date: "December 15, 2022",
    datetime: "2022-12-15",
    author: "Ella Davis",
    avatarSrc: "https://i.pravatar.cc/256",
    },
    {
    id: 10,
    rating: 5,
    content: `<p>Brian made us feel like we were his only clients. He was always available to answer our questions, making the entire process seamless.</p>`,
    type: "Selling",
    propertyValue: "$380,000",
    location: "Stonebridge, Saskatoon",
    duration: "3 weeks",
    date: "November 10, 2022",
    datetime: "2022-11-10",
    author: "William Clark",
    avatarSrc: "https://i.pravatar.cc/256",
    },
],
};
const faqs = [
{
    question: "What areas do you specialize in?",
    answer:
    "I specialize in residential real estate in Saskatoon and the surrounding areas. With five years of experience in this market, I have an in-depth understanding of local trends and neighborhoods.",
},
{
    question: "Do you work with both buyers and sellers?",
    answer:
    "Yes, I work with both buyers and sellers. My background in customer service has prepared me to effectively guide you through either process, ensuring a smooth and fulfilling experience.",
},
{
    question: "What is your commission rate?",
    answer:
    "My commission rates are competitive and transparent. Please get in touch for a detailed breakdown of the services included.",
},
{
    question: "How do you handle property valuations?",
    answer:
    "I use a comprehensive approach that includes market trends, recent sales data, and unique characteristics of the property to provide a realistic valuation.",
},
{
    question: "What marketing strategies do you employ for sellers?",
    answer:
    "My marketing strategies include a mix of online and offline methods such as listings on popular real estate platforms, social media advertising, and traditional open houses.",
},
{
    question: "How can you assist first-time buyers?",
    answer:
    "As someone who relocated and understands the challenges of finding a home in a new place, I offer personalized guidance. This includes explaining the home-buying process, financial advice, and neighborhood insights.",
},
{
    question: "How quickly can I expect to hear back from you?",
    answer:
    "I am committed to responsive communication. You can expect to hear back from me within 24 hours via your preferred communication channel—be it phone, text, or email.",
},
{
    question: "Do you offer virtual tours?",
    answer:
    "Yes, I offer virtual tours as part of my technology-enabled services. This allows you to explore properties from the comfort of your own home.",
},
{
    question: "What kind of contracts do you offer?",
    answer:
    "I offer a variety of contract options tailored to your specific needs, from short-term agreements to exclusive long-term contracts.",
},
{
    question: "Do you have references or testimonials?",
    answer:
    "Absolutely, I have a portfolio of testimonials from satisfied clients. Feel free to ask for references to get a better understanding of the experiences others have had when working with me.",
},
];
const license = {
href: "#",
summary:
    "I am licensed to practice in all the provinces of Canada and the USA",
content: `
<h4>About Me</h4>

<p>I'm a REALTOR® based in Saskatoon, specializing in residential real estate. My journey into this field is a bit unique: originally from New Zealand, I moved to Saskatoon five years ago. I know firsthand the challenges and the immense possibilities that come with finding a new home, especially in a place that you're still getting to know. This experience, along with my 15 years in customer service, enables me to approach real estate from a client-centric perspective, making the process as smooth and enjoyable as possible.</p>

<ul role="list">
    <li>Having served hundreds of clients in Saskatoon over the past five years, I understand the local market trends and community nuances like a true local.</li>
    <li>My background in customer service has equipped me with the people skills required to make your home-buying or -selling journey comfortable and fulfilling.</li>
    <li>As someone who navigated the challenges of moving to a new place, I can offer unique insights and strategies for finding your dream home.</li>
</ul>

<h4>Why Work With Me</h4>

<ul role="list">
    <li>Personal Connection: My unique journey allows me to empathize with your real estate needs on a deeper level, whether you're new to Saskatoon or have lived here all your life.</li>
    <li>Guided Expertise: With hundreds of successful transactions under my belt, I'm well-equipped to guide you through every step of the process, ensuring that you make informed decisions.</li>
    <li>Technology-Enabled: Leveraging the latest technology, from virtual tours to digital contracts, I make the process efficient and convenient for you.</li>
</ul>

<h4>Your Peace of Mind</h4>

<ul role="list">
    <li>Transparent Fees: No hidden costs or last-minute surprises. My commission rates are transparent and competitive.</li>
    <li>Integrity First: Trust is the cornerstone of my practice. My commitment to ethical dealings ensures that your interests are always put first.</li>
    <li>Responsive Communication: You'll never be left in the dark. I'm committed to staying available through your preferred communication channels, be it phone, text, or email.</li>
</ul>
`,
};

function classNames(...classes) {
return classes.filter(Boolean).join(" ");
}


export default function TabGroup(){
    const randomNumber = () => Math.floor(Math.random() * 70) + 1;
    return(
        <Tab.Group as="div">
        <div className="border-b border-gray-200 sticky top-0 bg-white">
          <Tab.List className="-mb-px flex space-x-8">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
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
                    ? "border-indigo-600 text-indigo-600"
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
                    ? "border-indigo-600 text-indigo-600"
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