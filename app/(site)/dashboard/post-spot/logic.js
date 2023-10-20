"use server";
import prisma from "../../../libs/prismadb";

export async function createDaycareSpot(
  spotsAvailable,
  minAgeMonths,
  maxAgeYears,
  pricePerMonth,
  startingDate,
  ownerEmail
) {
  "use server";
  console.log("Data received: ", arguments);

  // Verify required fields are present
  const requiredFields = [
    "spotsAvailable",
    "minAgeMonths",
    "maxAgeYears",
    "pricePerMonth",
    "startingDate",
    "ownerEmail",
  ];

  const params = {
    spotsAvailable,
    minAgeMonths,
    maxAgeYears,
    pricePerMonth,
    startingDate,
    ownerEmail,
  };

  const missingFields = requiredFields.filter(
    (field) => params[field] === undefined || params[field] === null
  );

  if (missingFields.length > 0) {
    return { error: `Missing fields: ${missingFields.join(", ")}` };
  }

  // Find the daycare in database
  const daycare = await prisma.daycares.findUnique({
    where: {
      ownerEmail: ownerEmail,
    },
  });

  if (!daycare) {
    return { error: `Daycare with email ${ownerEmail} not found` };
  }

  // Update the daycare in the database
  const daycareSpot = await prisma.daycares.update({
    where: {
      id: daycare.id,
    },
    data: {
      daycareSpots: {
        push: {
          spotsAvailable: spotsAvailable,
          minAgeMonths: minAgeMonths,
          maxAgeYears: maxAgeYears,
          pricePerMonth: pricePerMonth,
          startingDate: startingDate,
        },
      },
    },
  });

  return { success: daycareSpot };
}
