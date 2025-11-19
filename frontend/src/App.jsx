import React from "react"
import { Route, Routes } from "react-router" 
import { Toaster } from "react-hot-toast"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Electrical from "./pages/Electrical"
import Installation from "./pages/Installation"
import Personal from "./pages/Personal"
import HomeServices from "./pages/HomeServices"
import Renovation from "./pages/Renovation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Stats from "./components/Stats"
import Booking from "./pages/Booking"

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-center" /> 

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

        {/* IMPORTANT: Correct setup for nested routes */}
        <Route path="/electrical/*" element={<Electrical />} />

        <Route path="/installation" element={<Installation />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/homeservices" element={<HomeServices />} /> 
        <Route path="/renovation" element={<Renovation />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/stats" element={<Stats />} />
        <Route path="/booking/:topic" element={<Booking />} /> 
      </Routes>

      <Footer />
    </div>
  )
}

export default App
