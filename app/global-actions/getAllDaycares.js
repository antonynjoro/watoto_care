"use server"

import prisma from "../libs/prismadb";

export default async function getAllDaycares() {
    "use server"
    console.log("Entered getAllDaycares")
    const daycares = await prisma.daycares.findMany({
        where: {
            isReadyToDisplay: true
        },
        take: 100,
        orderBy: {
            date_created: "desc"
        },
    })
        

    return daycares;
}