import React from "react"
import { Route , Routes } from "react-router"
import { toast } from "react-hot-toast"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Services from "./pages/Services"
const App = () => {
  return (
    <div data-theme="synthwave">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  )
}

export default App