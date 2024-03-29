// app/[agentname]/page.jsx

import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import User from "../../components/user";
import TabGroup from "./TabGroup";
import AboutSection from "./AboutSection";
import {notFound} from 'next/navigation'


const agent = {
  name: "Brian Thompson",
  contact: {
    phone: "+1 (306) 238-3009",
    email: "antonynjoro@gmail.com",
    datetime: "2021-06-05",
  },
  price: "$220",
  description:
    "Specializing in residential and commercial properties, I bring a wealth of market knowledge and negotiation skills to my role as a Property Advisor. My passion lies in helping clients realize their dream homes and investment goals, offering personalized service every step of the way.",
  highlights: [
    "Sold over 200 properties",
    "Held Multiple Awards for customer satisfaction",
    "4.9 star ratings from 50+ satisfied customers",
  ],
  imageSrc:
    "https://cdn.midjourney.com/732df7ac-34cd-4fdc-8651-7a7b5ebd03d8/0_2.png",
  imageAlt: "Brian Thomson",
};

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





export default async function AgentProfile({ params }) {
    const session = await getServerSession(authOptions);
    const { agentname } = params;
    const data = await fetch(`http://localhost:3000/api/agents/${agentname}`); 

    if (!data.ok) {
        notFound();
    }

    const agentData = await data.json();
    
    if (!agentData) {
        notFound();
    }

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Agent */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Agent image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={agentData.image}
                alt={agentData.imageAlt}
                className="object-cover object-center"
                width={1000}
                height={1000}
              />
            </div>
          </div>

          {/* Agent details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {agentData.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Agent information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Phone: {agentData.phone}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Email: {agentData.email}
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{agentData.bio}</p>

            {/* Action Buttons */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-flame-600 px-8 py-3 text-base font-medium text-white hover:bg-flame-700 focus:outline-none focus:ring-2 focus:ring-flame-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Call
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-flame-50 px-8 py-3 text-base font-medium text-flame-700 hover:bg-flame-100 focus:outline-none focus:ring-2 focus:ring-flame-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                Email
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {agentData.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{" "}
                <a
                  href={license.href}
                  className="font-medium text-flame-600 hover:text-flame-500"
                >
                  Read full license
                </a>
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup testimonials={testimonials} faqs={faqs} license={license}/>
            
          </div>
          
        </div>
        <AboutSection aboutText={agentData.about} />
      </div>
    </div>
  );
};
