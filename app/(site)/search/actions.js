"use server";

import prisma from "../../libs/prismadb";

export async function searchDaycares(query) {
  "use server";
  const daycares = await prisma.daycares.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          neighborhood: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return daycares;
}

