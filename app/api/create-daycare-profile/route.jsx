import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body  = await request.json();

        let {
            slug,
            description,
            name,
            email,
            phone,
            neighborhood,
            city,
            state,
            country,
            zip,
            images,
            highlights,
            ownerName,
            ownerEmail,
        } = body;

        if (
            !slug ||
            !description ||
            !name ||
            !email ||
            !phone ||
            !neighborhood ||
            !city ||
            !state ||
            !country ||
            !zip ||
            !images ||
            !highlights ||
            !ownerName ||
            !ownerEmail
        ) {
            return new NextResponse(`Missing fields ${JSON.stringify(body)}`, { status: 400 });
        }

        const daycare = await prisma.daycares.findUnique({
            where: {
                slug,
            },
        });

        // if the daycare exists, throw an error
        if (daycare) {
            throw new Error("Daycare with that slug already exists");
        }

        // create the daycare
        const newDaycare = await prisma.daycares.create({
            data: {
                slug,
                description,
                name,
                email,
                phone,
                neighborhood,
                city,
                state,
                country,
                zip,
                images,
                highlights,
                ownerName,
                ownerEmail,
            },
        });

        return new NextResponse(JSON.stringify(newDaycare), { status: 200 });

    }
    catch (error) {
        console.log(error);
        return new NextResponse(error.message, { status: 500 });
    }
}
