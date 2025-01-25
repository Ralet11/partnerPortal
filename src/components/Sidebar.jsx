import { useLocation, useNavigate } from "react-router-dom"
import { HomeIcon, ClipboardIcon, ChartBarIcon, ClockIcon, CogIcon } from "@heroicons/react/24/outline"

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { icon: HomeIcon, path: "/partner/dashboard", label: "Dashboard" },
    { icon: ClipboardIcon, path: "/partner/orders", label: "Orders" },
    { icon: CogIcon, path: "/partner/settings", label: "Settings" },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-card dark:bg-card-dark border-r border-gray-200 dark:border-text-light/10 flex flex-col items-center py-6 space-y-8 shadow-lg">
      {/* Logo */}
      <div className="w-10 h-10 bg-primary/10 dark:bg-primary-light/10 rounded-xl flex items-center justify-center">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
      </div>

      {/* Navegación */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {menuItems.map((MenuItem, index) => {
          const active = location.pathname === MenuItem.path
          return (
            <button
              key={index}
              onClick={() => navigate(MenuItem.path)}
              className={`
                relative p-3 rounded-xl transition-all duration-200 group
                ${active ? "bg-primary/10 text-primary font-semibold dark:bg-primary-light/10 dark:text-primary-light" : "text-text-secondary dark:text-text-light"}
                hover:bg-primary/5 dark:hover:bg-primary-light/5
              `}
            >
              <MenuItem.icon
                className={`w-6 h-6 ${active ? "text-primary dark:text-primary-light" : "text-text-secondary dark:text-text-light"}`}
              />
              {/* Tooltip */}
              <span
                className="
                absolute left-full ml-4 px-2 py-1 bg-card dark:bg-card-dark text-text-primary dark:text-white
                rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100
                transition-opacity shadow-lg pointer-events-none border border-gray-200 dark:border-text-light/10
              "
              >
                {MenuItem.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

