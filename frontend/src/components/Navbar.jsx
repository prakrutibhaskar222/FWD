
import React, { useState } from "react";
import { Link } from 'react-router'

const Navbar = () => {

// ✅ Define login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully!");}

  return (
    
    <div className='bg-[#e9e4de]' >
      <header className="flex justify-between items-center ">
        <div className="text-xl font-semibold sixtyfour">COOLIE</div>
        <nav className="space-x-4 text-sm  uppercase tracking-wide mt-2 mb-2">
            <button className="btn glass bg-[#e5d4c0]">
                <a href="#Electrical"><Link to="/electrical" >
                                ELECTRICAL
                            </Link>
                            </a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href=""><Link to="/installation" >
                                INSTALLATION
                            </Link>
                            </a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href=""><Link to="/personal" >
                                PERSONAL
                            </Link>
                            </a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href=""><Link to="/homeservices" >
                                HOME SERVICES
                            </Link>
                            </a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href=""><Link to="/renovation" >
                                RENOVATION
                            </Link>
                            </a>
            </button>
            
            
          
        </nav>
        
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="🕵️ Search for services"
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none"
          />
        </div>
        
        {!isLoggedIn ? (
  <button className="btn glass bg-[#e5d4c0]">
    <Link to="/login" className="text-black no-underline">
      Log in
    </Link>
  </button>
) : (
  <button
    onClick={() => setIsLoggedIn(false)}
    className="btn glass bg-red-400 text-white hover:bg-red-500"
  >
    Logout
  </button>
)}



      </header>
    </div>
  )
}


export default Navbar