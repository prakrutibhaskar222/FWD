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
          <p>Home Cleaning</p>
          <p>Salon & Grooming</p>
          <p>Repair & Maintenance</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Contact</h4>
          <p>Email</p>
          <p>Store</p>
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