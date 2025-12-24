import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    { name: "Electrical", path: "/electrical" },
    { name: "Home Services", path: "/homeservices" },
    { name: "Installation", path: "/installation" },
    { name: "Personal", path: "/personal" },
    { name: "Renovation", path: "/renovation" },
  ];

  // ✅ THIS is the critical part
  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    syncAuth(); // initial load
    window.addEventListener("auth-change", syncAuth);
    window.addEventListener("storage", syncAuth); // cross-tab

    return () => {
      window.removeEventListener("auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <>
      <div className="bg-[#e9e4de] sticky top-0 z-50 shadow-sm">
        <header className="flex justify-between items-center px-6 h-16">

          {/* LOGO */}
          <Link to="/home" className="text-2xl font-semibold">
            COOLIE
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-3 uppercase text-sm">
            {services.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="btn glass bg-[#e5d4c0]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-1 rounded-lg border-2 border-[#D0B79A]"
              >
                Log in
              </Link>
            ) : (
              <div className="relative dropdown dropdown-end">
                <label tabIndex={0}>
                  <FaUserCircle className="text-3xl cursor-pointer" />
                </label>
                <ul className="menu dropdown-content bg-base-100 rounded-box w-40 shadow mt-3">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/my-bookings">My Bookings</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}

            {/* MOBILE */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </header>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f2e3c6] px-6 py-4">
          {services.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block py-2"
            >
              {item.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link to="/login" className="block py-2">Login</Link>
          ) : (
            <button onClick={handleLogout} className="block py-2 text-red-600">
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
