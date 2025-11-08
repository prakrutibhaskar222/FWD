import React from 'react'

const Navbar = () => {
  return (
    
    <div className='bg-[#e9e4de]' >
      <header className="flex justify-between items-center ">
        <div className="text-xl font-semibold sixtyfour">COOLIE</div>
        <nav className="space-x-4 text-sm  uppercase tracking-wide mt-2 mb-2">
            <button className="btn glass bg-[#e5d4c0]">
                <a href="#Electrical">ELECTRICAL</a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href="">PROPERTY SERVICES</a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href="">RENOVATION</a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href="">INSTALLATION</a>
            </button>
            <button className="btn glass bg-[#e5d4c0]">
                <a href="">PERSONAL</a>
            </button>
          
        </nav>
        <div className="text-lg cursor-pointer">🔍</div>
      </header>
    </div>
  )
}

export default Navbar