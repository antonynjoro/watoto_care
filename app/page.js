import React from 'react'
import NavBar from './(site)/components/NavBar'

function HomePage() {
  return (
    <>
    <div className="min-h-full">
      {/* Page header */}
      <NavBar />

      {/* Body */}
      <main className="py-10">
        {/* Main container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          HomePage
        </div>
      </main>
    </div>
    </>
  )
}

export default HomePage