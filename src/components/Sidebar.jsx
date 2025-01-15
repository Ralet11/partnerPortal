import { useLocation, useNavigate } from 'react-router-dom'
import { 
  HomeIcon, 
  ClipboardIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CogIcon 
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { icon: HomeIcon, path: '/dashboard', label: 'Dashboard' },
    { icon: ClipboardIcon, path: '/orders', label: 'Orders' },
    { icon: ChartBarIcon, path: '/statistics', label: 'Statistics' },
    { icon: ClockIcon, path: '/history', label: 'History' },
    { icon: CogIcon, path: '/settings', label: 'Settings' },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-primary-dark to-primary flex flex-col items-center py-8 space-y-8">
      {/* Logo Container */}
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
      </div>
      
      {/* Nav Menu */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {menuItems.map((MenuItem, index) => {
          const active = location.pathname === MenuItem.path
          return (
            <button
              key={index}
              onClick={() => navigate(MenuItem.path)}
              className={`
                p-3 rounded-xl transition-all duration-200 group relative
                ${active 
                  ? 'bg-white/20 text-white shadow-lg shadow-primary/20' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <MenuItem.icon className="w-6 h-6" />
              <span className="
                absolute left-full ml-4 px-2 py-1 bg-white text-primary
                rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 
                transition-opacity shadow-lg pointer-events-none
              ">
                {MenuItem.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
