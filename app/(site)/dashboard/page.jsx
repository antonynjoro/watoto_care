"use client"
import { signOut } from "next-auth/react"

import { useSession } from "next-auth/react"

import PageHeadingWithAction from "./components/PageHeadingWithAction"



  

export default function DashboardPage(){
    const  {data: session, status} = useSession()

    console.log(session)
    return(
        <>
            <PageHeadingWithAction
                title="Dashboard"  
                pages={[
                    { name: 'Dashboard', href: '#', current: true },
                ]}
                primaryAction={{
                    name: 'New Post',
                    handlePrimaryAction: () => console.log('Primary action'),
                }}
            />
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut({ callbackUrl: '/' })}
            >
                Sign Out
            </button>

            <p>{JSON.stringify(session)}</p>
        </>
    )
}