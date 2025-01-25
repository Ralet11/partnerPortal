import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import ThemeToggle from './ThemeToogle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutPartner } from '../redux/slices/partnerSlice'; 

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partner = useSelector((state) => state.partner);

  // Cerrar sesión
  const handleLogout = () => {
    dispatch(logoutPartner());
    navigate('/'); 
  };

  // Ir a Settings
  const handleGoToSettings = () => {
    navigate('/partner/settings');
  };

  return (
    <header className="flex items-center justify-between bg-card dark:bg-card-dark border-b border-gray-200 dark:border-text-light/10 px-6 py-4 shadow-lg">

      <h1 className="text-xl ml-14 font-bold text-text-primary dark:text-white">
        BurguerHub
      </h1>

      <div className="flex items-center space-x-6">

        <ThemeToggle />

        {/* Botón notificaciones */}
        <button className="relative p-2 rounded-full hover:bg-background dark:hover:bg-background-dark transition-colors">
          <BellIcon className="w-6 h-6 text-text-primary dark:text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary dark:bg-primary-light rounded-full" />
        </button>

        {/* Perfil de usuario */}
        <div className="relative group">
          <button className="flex items-center space-x-3 p-1 rounded-full hover:bg-background dark:hover:bg-background-dark transition-colors">
            <img
              src="https://v0.dev/placeholder.svg?height=40&width=40"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-text-light/10"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary dark:text-white">
                {partner.name}
              </p>
              <p className="text-xs text-text-secondary dark:text-text-light">
                Restaurant Owner
              </p>
            </div>
          </button>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 mt-2 w-48 py-2 bg-card dark:bg-card-dark rounded-xl shadow-lg
              border border-gray-200 dark:border-text-light/10
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200
            "
          >
            
            {/* Usamos onClick para ir a Settings */}
            <button
              onClick={handleGoToSettings}
              className="block w-full text-left px-4 py-2 text-sm text-text-primary dark:text-white hover:bg-background dark:hover:bg-background-dark"
            >
              Settings
            </button>
            <div className="my-1 border-t border-gray-200 dark:border-text-light/10"></div>
            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-primary dark:text-primary-light hover:bg-background dark:hover:bg-background-dark"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
