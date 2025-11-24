import React from 'react'
import { Link } from "react-router";

const Footer = () => {
  return (
    <div><footer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm pt-10 border-t border-gray-300">
        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Navigation</h4>
          <p>Shop</p>
          <p>Legacy</p>
          <p>Support</p>
        </div>
        <div className="space-y-2">
        <h4 className="font-semibold uppercase text-xs">Services</h4>

        <Link to="/electrical" className="block hover:text-blue-500">Electrical</Link>
          <Link to="/installation" className="block hover:text-[#25e93f]">Installation</Link>
        <Link to="/personal" className="block hover:text-blue-500">Personal</Link>
        <Link to="/homeservices" className="block hover:text-blue-500">Home Services</Link>
        <Link to="/renovation" className="block hover:text-blue-500">Renovation</Link>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Contact</h4>
          <p>Email-rvandanaa.cs24@bmsce.ac.in</p>
          <p>Contact-7619443280</p>
          <p>FAQ</p>
        </div>
        <div className="space-y-2 text-xs opacity-80">
          <p>© Coolie Premium 2025 </p>
          <p>Made in India</p>
        </div>
      </footer></div>
  )
}

export default Footer