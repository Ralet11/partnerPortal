import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-dark to-primary">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      
      <div className="flex items-center space-x-6">
        {/* Búsqueda */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Search orders..."
            className="
              pl-12 pr-4 py-2.5 
              rounded-xl 
              border-0
              w-64 text-sm transition-all
              bg-white/10
              text-white
              placeholder:text-white/60
              focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/20
            "
          />
        </div>
        
        {/* Notificaciones */}
        <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
          <BellIcon className="w-6 h-6 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-light rounded-full"></span>
        </button>
        
        {/* Perfil y dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 transition-colors">
            <img
              src="https://v0.dev/placeholder.svg?height=40&width=40"
              alt="Profile"
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-white/20"
            />
            <div className="text-left text-white">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-white/80">Restaurant Owner</p>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          <div className="
            absolute right-0 mt-2 w-48 py-2
            bg-white rounded-xl shadow-xl
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-200
          ">
            <a href="#profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/5">
              Profile
            </a>
            <a href="#settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/5">
              Settings
            </a>
            <div className="my-2 border-t border-gray-100"></div>
            <a href="#logout" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/5">
              Sign out
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
