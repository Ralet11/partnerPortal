// Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
    
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              BurgerHub
            </Link>
          </div>


          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>


          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link
              to="/#menu"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Menu
            </Link>
            <Link
              to="/#locations"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Locations
            </Link>
            <Link
              to="/#about"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
            
  
            <Link
              to="/login-partner"
              className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors"
            >
              Login
            </Link>

          
            <Link
              to="/join-partner"
              className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Join as Partner
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/#menu"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
          >
            Menu
          </Link>
          <Link
            to="/#locations"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
          >
            Locations
          </Link>
          <Link
            to="/#about"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
          >
            About
          </Link>
          
  
          <Link
            to="/login-partner"
            className="block border border-orange-600 text-orange-600 px-4 py-2 rounded-md text-base font-medium hover:bg-orange-600 hover:text-white mt-4 transition-colors"
          >
            Login
          </Link>

 
          <Link
            to="/join-partner"
            className="block bg-orange-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-orange-700 mt-4 transition-colors"
          >
            Join as Partner
          </Link>
        </div>
      )}
    </nav>
  )
}
