import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

export async function handleCreateDaycareSpot(
  spotsAvailable,
  minAgeMonths,
  maxAgeYears,
  pricePerMonth,
  startingDate,
  ownerEmail
) {

  try {
    const response = await fetch("/api/post-spot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotsAvailable,
        minAgeMonths,
        maxAgeYears,
        pricePerMonth,
        startingDate,
        ownerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    console.log("status:", response.status);
    toast.success("Spot Created Successfully");
    console.log("Data:", data);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000)

  } catch (error) {
    console.log(error);
    toast.error(`Spot Creation Failed: ${error}`);
  }

}
