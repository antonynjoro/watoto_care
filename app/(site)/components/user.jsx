"use client"

import { useSession } from "next-auth/react"

export default function User() {
    const {data: session, status} = useSession()


    return(
        <div>
            <h1>Client Side Session</h1>
            <pre>{JSON.stringify(session)}</pre>
        </div>
    )   
}