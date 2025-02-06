// Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {function} onLoginClick - función que se llama al hacer click en "Login"
 * @param {function} onJoinClick - función que se llama al hacer click en "Join as Partner"
 * @param {boolean} isUser - Indica si se deben ocultar los botones de login. Por defecto, false.
 */
export default function Navbar({ onLoginClick, onJoinClick, isUser = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              BurgerHub
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <a
              href="#menu"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Menu
            </a>
            <a
              href="#locations"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Locations
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              About
            </a>

            {/* Si isUser es false, mostramos el botón "Login" */}
            {!isUser && (
              <button
                onClick={onLoginClick}
                className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={onJoinClick}
              className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Join as Partner
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu open */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="#menu"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </a>
          <a
            href="#locations"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Locations
          </a>
          <a
            href="#about"
            className="block text-gray-700 hover:text-orange-600 px-3 py-2 text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>

          {/* Si isUser es false, mostramos el botón "Login" en móvil */}
          {!isUser && (
            <button
              onClick={() => {
                onLoginClick();
                setIsOpen(false);
              }}
              className="block border border-orange-600 text-orange-600 px-4 py-2 rounded-md text-base font-medium hover:bg-orange-600 hover:text-white mt-4 transition-colors"
            >
              Login
            </button>
          )}

          <button
            onClick={() => {
              onJoinClick();
              setIsOpen(false);
            }}
            className="block bg-orange-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-orange-700 mt-4 transition-colors"
          >
            Join as Partner
          </button>
        </div>
      )}
    </nav>
  );
}
