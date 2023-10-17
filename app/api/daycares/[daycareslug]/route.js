// app/api/daycares/[daycarename]/route.js

import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const daycareslug = request.nextUrl.pathname.split('/').pop();

    console.log("route api page")
    console.log("daycareslug in the route page")
    console.log(daycareslug)

    try {
        const dayCareData = await prisma.daycares.findUnique({
            where: {
                slug: daycareslug
            }
        });

        if (!dayCareData) {
            console.log("Daycare not found")
            return new NextResponse('Daycare not found', {status: 404});
        }

        console.log("dayCareData")
        console.log(dayCareData)

        return NextResponse.json(dayCareData);
    } catch (error) {
        console.error("Error fetching daycare data:", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
