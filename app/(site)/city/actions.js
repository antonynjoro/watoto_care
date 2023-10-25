"use server";

import prisma from "../../libs/prismadb";
import { notFound } from "next/navigation";

export default async function getCityDaycares(cityName) {
  "use server";
  
  const daycares = await prisma.daycares.findMany({
    where: {
      OR: [
        {
          cityName: {
            contains: cityName,
            mode: "insensitive",
          },
        },
      ],
    },
  });



  return daycares;
}

export async function fetchAllDaycareCities() {
  "use server";

  const citiesWithDaycares = await prisma.canadaCities.findMany({
    select: {
      cityName: true,
      provinceName: true,
      slug: true,
    },
    where: {
      daycares: {
        some: {
          isReadyToDisplay: true,
        },
      },
    },
  });
  
  

  return citiesWithDaycares;
}


