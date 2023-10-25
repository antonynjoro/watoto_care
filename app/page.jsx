"use client"
import React, { useEffect, useState } from 'react'
import NavBar from './(site)/components/NavBar'
import CitySelector from './(site)/components/CitySelector/CitySelector'
import { on } from 'events'

function HomePage() {
  const [chosenCity, setChosenCity] = useState(null)
  const onChooseCity = (city) => {
    setChosenCity(city)
  }

  useEffect(() => {
    if (chosenCity) {
      // Redirect to city page
      window.location.href = `/city/${chosenCity.slug}`
    }
  }, [chosenCity, onChooseCity])

  useEffect(() => {
    console.log('chosenCity')
    console.log(chosenCity)
  } , [chosenCity, setChosenCity])


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
          <CitySelector onCitySelect={onChooseCity} />
        </div>
      </main>
    </div>
    </>
  )
}

export default HomePage