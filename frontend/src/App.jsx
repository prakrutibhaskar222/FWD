import React from "react"
import { Route, Routes } from "react-router" 
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Landing from "./pages/Landing"
import Personal from "./pages/Personal"
import Electrical from "./pages/Electrical"
import Renovation from "./pages/Renovation"
import Installation from "./pages/Installation"
import Home from "./pages/Home"
import PropertyServices from "./pages/PropertyServices"

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <Navbar />
      <Toaster position="top-center" /> 

     
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/home" element={<Home />} />
          <Route path="/renovation" element={<Renovation />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/propertyservices" element={<PropertyServices />} />
        </Routes>
      

     
      <Footer />
    </div>
  )
}

export default App