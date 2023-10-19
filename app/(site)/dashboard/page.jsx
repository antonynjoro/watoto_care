"use client"
import { signOut } from "next-auth/react"

import { useSession } from "next-auth/react"

import PageHeading from "./components/PageHeadings"
import Link from "next/link"




  

export default function DashboardPage(){
    const  {data: session, status} = useSession()


    console.log(session)
    return (
      <>
        <PageHeading
          title="Dashboard"
          pages={[{ name: "Dashboard", href: "#", current: true }]}
        />

        <div className="flex flex-col items-start gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>

          <Link 
            className="bg-gray-900 hover:bg-gray-800 text-white rounded py-2 px-4"
            href="/dashboard/post-spot"
          >
            Post a Daycare Spot
          </Link>

          <p>
            {(status === "loading") ? "Loading..." : JSON.stringify(session)}
         </p>
        </div>
      </>
    );
}