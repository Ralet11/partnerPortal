import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutPartner, setOrders } from "../redux/slices/partnerSlice";
import { io } from "socket.io-client";
import ThemeToggle from "./ThemeToogle";

const socket = io(import.meta.env.VITE_API_URL);

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const partner = useSelector((state) => state.partner);
  const orders = partner.orders || [];
  
  const [isNewOrder, setIsNewOrder] = useState(false);
  const [showNewOrderText, setShowNewOrderText] = useState(false);

  const activeOrdersCount = orders.filter(
    (order) =>
      order.status.toLowerCase() !== "cancelada" &&
      order.status.toLowerCase() !== "finalizada" &&
      order.status.toLowerCase() !== "rechazada"
  ).length;

  useEffect(() => {
    socket.on("new-order", (newOrder) => {
      dispatch(setOrders([...orders, newOrder]));
      triggerNotificationAnimation();
    });

    return () => {
      socket.off("new-order");
    };
  }, [dispatch, orders]);

  useEffect(() => {
    if (location.pathname.includes("/partner/orders")) {
      setShowNewOrderText(false);
    }
  }, [location]);

  const triggerNotificationAnimation = () => {
    setIsNewOrder(true);
    setShowNewOrderText(true);
    setTimeout(() => setIsNewOrder(false), 1000);
  };

  const handleNotificationClick = () => {
    setShowNewOrderText(false);
    navigate("/partner/orders");
  };

  const handleLogout = () => {
    dispatch(logoutPartner());
    navigate("/");
  };

  const handleGoToSettings = () => {
    navigate("/partner/settings");
  };

  return (
    <header className="flex items-center justify-between bg-card dark:bg-card-dark border-b border-gray-200 dark:border-text-light/10 px-6 py-4 shadow-lg">
      <h1 className="text-xl ml-14 font-bold text-text-primary dark:text-white">
        BurguerHub
      </h1>

      <div className="flex items-center space-x-6">
        <ThemeToggle />

        <div className="relative flex items-center space-x-3">
          <button
            onClick={handleNotificationClick}
            className={`relative p-2 rounded-full hover:bg-background dark:hover:bg-background-dark transition-colors ${
              isNewOrder ? "animate-bell" : ""
            }`}
          >
            <BellIcon className="w-6 h-6 text-text-primary dark:text-white" />
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold bg-primary text-white rounded-full">
                {activeOrdersCount}
              </span>
            )}
          </button>

          {showNewOrderText && (
            <span className="text-sm font-semibold text-primary dark:text-primary-light">
              New Order
            </span>
          )}
        </div>

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

          <div
            className="absolute right-0 mt-2 w-48 py-2 bg-card dark:bg-card-dark rounded-xl shadow-lg
              border border-gray-200 dark:border-text-light/10
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200"
          >
            <button
              onClick={handleGoToSettings}
              className="block w-full text-left px-4 py-2 text-sm text-text-primary dark:text-white hover:bg-background dark:hover:bg-background-dark"
            >
              Settings
            </button>
            <div className="my-1 border-t border-gray-200 dark:border-text-light/10"></div>
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
