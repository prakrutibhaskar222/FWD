import React from "react"
import { Route, Routes } from "react-router" 
import { Toaster } from "react-hot-toast"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Installation from "./pages/Installation"
import Personal from "./pages/Personal"
import HomeServices from "./pages/HomeServices"
import Renovation from "./pages/Renovation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Stats from "./components/Stats"
import Booking from "./pages/Booking"
import Legacy from "./pages/Legacy"
import Support from "./pages/Support"
import Shop from "./pages/Shop"
import AdminBookings from "./pages/admin/AdminBookings"
import AdminServices from "./pages/admin/AdminServices"
import Dashboard from "./pages/admin/Dashboard"
import ServiceDetails from "./pages/ServiceDetails.jsx"
import ElectricalPage from "./pages/ElectricalPage";
import WorkerDashboard from "./pages/workers/WorkerDashboard.jsx" 

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-center" /> 

      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/shop" element={<Shop />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/support" element={<Support />} />

        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/home" element={<Home />} />
        
        <Route path="/electrical" element={<ElectricalPage />} />
        <Route path="/installation/*" element={<Installation />} />
        <Route path="/personal/*" element={<Personal />} />
        <Route path="/homeservices/*" element={<HomeServices />} /> 
        <Route path="/renovation/*" element={<Renovation />} /> 
        
        <Route path="/stats" element={<Stats />} />
        <Route path="/booking/service/:id" element={<Booking />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/service/:id" element={<ServiceDetails />} />

        <Route path="/worker/dashboard" element={<WorkerDashboard />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App
