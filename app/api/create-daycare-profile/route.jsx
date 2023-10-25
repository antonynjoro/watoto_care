import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { cityId, ...restOfBody } = body;


        const requiredFields = [
            "slug",
            "description",
            "licensingStatus",
            "name",
            "email",
            "phone",
            "neighborhood",
            "cityId",
            "cityName",
            "state",
            "country",
            "zip",
            "images",
            "highlights",
            "ownerName",
            "ownerEmail",
            "ownerPhoto",
            "openingTime",
            "closingTime",
            "firstDay",
            "lastDay",
            "capacity",
            "minimumAgeMonths",
            "maximumAgeYears",
        ];

        const missingFields = requiredFields.filter(field => body[field] === undefined || body[field] === null || body[field] === "");

        if (missingFields.length > 0) {
            return new NextResponse(`Missing fields: ${missingFields.join(', ')}`, { status: 400 });
        }

        const daycare = await prisma.daycares.findUnique({
            where: {
                slug: body.slug,
            },
        });

        // if the daycare exists, throw an error
        if (daycare) {
            return new NextResponse("Daycare with that slug already exists", { status: 400 });
        }

        // if daycareEmail exists, throw an error (daycare owners can only list one daycare)
        const daycareEmail = await prisma.daycares.findUnique({
            where: {
                ownerEmail: body.ownerEmail,
            },
        });

        if (daycareEmail) {
            return new NextResponse("Daycare listing already created with your logged in email.", { status: 400 });
        }

        // Use the received city ID to connect the new daycare listing to the existing city record
        const cityAction = {
            connect: {
                id: cityId,
            },
        };

        // create the daycare
        const newDaycare = await prisma.daycares.create({
            data: {
                ...restOfBody,
                city: cityAction,
            },
        });

        return new NextResponse(JSON.stringify(newDaycare), { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error. Please try again later.", { status: 500 });
    }
}






