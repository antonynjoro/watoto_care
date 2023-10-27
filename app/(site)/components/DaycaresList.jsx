import { Suspense } from "react";
import DaycareCard from "./DaycareCard";

export default function DaycaresList({ daycares }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
      {daycares.map((daycare) => (
        <DaycareCard daycare={daycare} />
      ))}
    </div>
  );
}
