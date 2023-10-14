
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';


export async function POST(request){
   try{
    const body = await request.json();


    const requiredFields = ['spotsAvailable', 'minAgeMonths', 'maxAgeYears', 'pricePerMonth', 'startingDate', 'ownerEmail'];

    const missingFields = requiredFields.filter((field) => body[field] === undefined || body[field] === null);

    if(missingFields.length > 0){
      return new NextResponse(`Missing required fields: ${missingFields.join(', ')}`, {status: 400});
    }

    const daycare = await prisma.daycares.findUnique({
      where: {
        ownerEmail: body.ownerEmail
      }
    });

    if(!daycare){
      return new NextResponse(`Daycare with email ${body.ownerEmail} not found`, {status: 404});
    }

    const daycareSpot = await prisma.daycares.update({
      where: {
        id : daycare.id
      },
      data: {
        daycareSpots: {
          push: {
            spotsAvailable: body.spotsAvailable,
            minAgeMonths: body.minAgeMonths,
            maxAgeYears: body.maxAgeYears,
            pricePerMonth: body.pricePerMonth,
            startingDate: body.startingDate,
          }
        }

      }
    });

    return new NextResponse(JSON.stringify(daycareSpot), {status: 200});
   }
    catch(error){
      console.log(error);
      return new NextResponse(error, {status: 500});
    }
}