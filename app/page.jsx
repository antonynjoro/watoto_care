"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./(site)/components/NavBar";
import CitySelector from "./(site)/components/CitySelector/CitySelector";
import DaycareList from "./(site)/components/DaycaresList";
import getAllDaycares from "./global-actions/getAllDaycares";
import CallToAction from "./(site)/components/CallToAction";

function HomePage() {
  const [chosenCity, setChosenCity] = useState(null);
  const [daycares, setDaycares] = useState([]);
  const onChooseCity = (city) => {
    setChosenCity(city);
  };

  useEffect(() => {
    if (chosenCity) {
      // Redirect to city page
      window.location.href = `/city/${chosenCity.slug}`;
    }
  }, [chosenCity, onChooseCity]);

  useEffect(() => {
    getAllDaycares().then((daycares) => {
      console.log("setting daycares");
      console.log(daycares);
      setDaycares(daycares);
    });
  }, []);

  return (
    <>
      <div className="min-h-full">
        {/* Page header */}
        <NavBar />

        {/* Body */}
        <main className="py-10">
          {/* Main container */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            Find a daycare in your city
            <CitySelector onCitySelect={onChooseCity} showLabel={false} />
            <div className="py-6">
              <h2 className="pb-4 text-2xl">Latest daycares in Canada</h2>
              <DaycareList daycares={daycares} />
            </div>
            <CallToAction
            heading="Are you a daycare owner?"
            subheading="Register your daycare to get discovered by parents in your area."
            primaryButtonText="Register your daycare"
            primaryButtonLink="/register/daycare"
          />
          </div>
          
        </main>
      </div>
    </>
  );
}

export default HomePage;
