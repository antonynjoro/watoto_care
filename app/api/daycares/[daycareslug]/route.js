// app/api/daycares/[daycarename]/route.js

import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const daycareslug = request.nextUrl.pathname.split('/').pop();

    console.log("daycares api page");
    console.log("daycareslug in the route page");
    console.log(daycareslug);

    try {
        const dayCareData = await prisma.daycares.findUnique({
            where: {
                slug: daycareslug
            }
        });

        console.log("dayCareData");
        console.log(dayCareData);

        if (!dayCareData) {
            console.log("Daycare not found");
            return new NextResponse({message: 'Daycare not found'}, {status: 404});
        }

        if (!dayCareData.isReadyToDisplay) {
            console.log("Daycare is not ready to display");
            return new NextResponse({message: 'Daycare not ready for display'}, {status: 404});
        }

        console.log("dayCareData");
        console.log(dayCareData);

        return NextResponse.json(dayCareData);
    } catch (error) {
        console.error("Error fetching daycare data:", error);
        return new  NextResponse({message: 'Internal Server Error'}, {status: 500});
    }
}
