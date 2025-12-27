import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  /* ================= SEARCH ================= */

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/services/navbar-search?for=navbar&q=${searchTerm}`
        );
        const json = await res.json();
        setSuggestions(json.data || []);
        setActiveIndex(-1);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selected =
        activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
      navigate(selected.route);
      resetSearch();
    }

    if (e.key === "Escape") resetSearch();
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const highlightMatch = (text = "") => {
  if (typeof text !== "string" || !searchTerm) return text || "";

  return text.replace(
    new RegExp(`(${searchTerm})`, "gi"),
    "<mark>$1</mark>"
  );
};


  /* ================= JSX ================= */

  return (
    <div className="bg-[#e9e4de] px-4 relative z-[9999]">
      <header className="flex justify-between items-center py-3">

        {/* LOGO */}
        <Link to="/home" className="text-xl font-semibold">
          COOLIE
        </Link>

        {/* NAV LINKS */}
        <nav className="space-x-3 text-sm uppercase tracking-wide">
          {[
            { name: "Electrical", path: "/electrical" },
            { name: "Home Services", path: "/homeservices" },
            { name: "Installation", path: "/installation" },
            { name: "Personal", path: "/personal" },
            { name: "Renovation", path: "/renovation" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="btn glass bg-[#e5d4c0]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* SEARCH BAR */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none"
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl max-h-64 overflow-auto">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    navigate(item.route);
                    resetSearch();
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    index === activeIndex
                      ? "bg-[#f3ede6]"
                      : "hover:bg-[#f3ede6]"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(item?.label || ""),
                  }}
                />
              ))}
            </ul>
          )}
        </div>

        {/* LOGIN / PROFILE */}
        <div className="ml-4 relative">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-1 rounded-lg font-medium border"
            >
              Log in
            </Link>
          ) : (
            <div className="relative group">
              <FaUserCircle className="text-3xl cursor-pointer" />

              {/* PROFILE DROPDOWN */}
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/favorites"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/history"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Service History
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/invoices"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Invoices
                  </Link>
                </li>

                <li className="border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
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
