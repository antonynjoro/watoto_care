import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request) {

    console.log("cities api page")
    console.log("Search query")
    console.log(request.nextUrl.searchParams.get('query'))

    const query = request.nextUrl.searchParams.get('query')

    try {
        const cities = await prisma.canadaCities.findMany({
            where: {
                cityName: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            take : 50,
        });

        if (!cities) {
            console.log("Cities not found")
            return new NextResponse('No city found', {status: 404});
        }

        const sortedCities = cities.sort((a, b) => {
            const aStartsWithQuery = a.cityName.toLowerCase().startsWith(query.toLowerCase());
            const bStartsWithQuery = b.cityName.toLowerCase().startsWith(query.toLowerCase());
          
            if (aStartsWithQuery && bStartsWithQuery) {
              return a.cityName.localeCompare(b.cityName);
            } else if (aStartsWithQuery) {
              return -1;
            } else if (bStartsWithQuery) {
              return 1;
            } else {
              return a.cityName.localeCompare(b.cityName);
            }
          });

        console.log("cities object generated")
        console.log("count: " + cities.length)

        return NextResponse.json(sortedCities);
    } catch (error) {
        console.error("Error fetching cities data:", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }

}
