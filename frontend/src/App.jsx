import React from "react"
import { Route , Routes } from "react-router"
import { toast } from "react-hot-toast"
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Services from "./pages/Services"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        
      </Routes>
    </div>
  )
}

export default App