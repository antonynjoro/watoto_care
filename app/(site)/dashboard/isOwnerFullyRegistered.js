"use server"
import prisma from "../../libs/prismadb";

export default async function isOwnerFullyRegistered(ownerEmail) {
    "use server"
    console.log("isOwnerFullyRegistered function")
    try {
        const ownerDaycare = await prisma.daycares.findUnique({
            where: {
                ownerEmail: ownerEmail
            }
        });

        if (!ownerDaycare) {
            // Consider a logging mechanism here
            console.log("Daycare owner not found")
            return false;
        }
        
        console.log("Daycare owner found")
        return true

    } catch (error) {
        // Consider a logging mechanism here
        return  `Error fetching owner data: ${error.message}`;
    }
}
