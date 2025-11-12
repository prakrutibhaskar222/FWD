import React from 'react'

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
          <p>Electrical</p>
          <p>Installation</p>
          <p>Personal</p>
          <p>Home Services</p>
          <p>Renovation</p>
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