// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";

// Color palette
const PALETTE = {
  beige: "#F3D79E",
  brown: "#B57655",
  cream: "#F2E3C6",
  tan: "#E7D2AC",
  nude: "#D0B79A",
  black: "#000000",
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <div className='bg-[#e9e4de]' >
      <header className="flex justify-between items-center ">
        <Link
            to="/home"
            className="text-xl font-semibold sixtyfour"
        >
        COOLIE
        </Link>
        <nav className="space-x-4 text-sm  uppercase tracking-wide mt-2 mb-2">
            <button className="btn glass bg-[#e5d4c0]">
                <Link to="/electrical" >
                                ELECTRICAL
                            </Link>
                    
            </button>
            < button className="btn glass bg-[#e5d4c0]">
                <Link to="/homeservices" >
                                HOME SERVICES
                            </Link>
                            
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <Link to="/installation" >
                                INSTALLATION
                            </Link>
                            
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <Link to="/personal" >
                                PERSONAL
                            </Link>
                            
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <Link to="/renovation" >
                                RENOVATION
                            </Link>
                            
            </button>
            
            
          
        </nav>
        
        <div className="flex items-end space-x-3">
          <input
            type="text"
            placeholder="🕵️ Search for services"
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none"
          />
        </div>
        
        {/* Login / User Dropdown */}
        <div className="ml-4 flex items-center space-x-2">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-1 rounded-lg font-medium bg-beige text-brown border-2 border-[#D0B79A]"
            >
              Log in
            </Link>
          ) : (
            <div className="relative dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <FaUserCircle className="text-3xl" style={{ color: PALETTE.brown }} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-md rounded-lg w-40"
                style={{
                  background: PALETTE.cream,
                  border: `1px solid ${PALETTE.tan}`,
                  color: PALETTE.brown,
                }}
              >
                <li>
                  <Link to="/profile" className="font-medium">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="font-medium text-left w-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
