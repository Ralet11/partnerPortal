"use client";

import React, { useState } from "react";
import axios from "axios";
import "./scrollBars.css";
import { useSelector, useDispatch } from "react-redux";
import OrderDetailsModal from "../components/OrderModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { updateOrder } from "../redux/slices/partnerSlice.js";

const PRIMARY_COLOR = "#F15A24";
const API_URL = import.meta.env.VITE_API_URL;

export default function Orders() {
  const dispatch = useDispatch();
  const partner = useSelector((state) => state.partner);
  const orders = partner.orders || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  // Filtra por code o deliveryAddress
  const lowerSearch = searchTerm.toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const codeMatch = (order.code || "").toLowerCase().includes(lowerSearch);
    const addressMatch = (order.deliveryAddress || "")
      .toLowerCase()
      .includes(lowerSearch);
    return codeMatch || addressMatch;
  });

  // Agrupamos por estatus
  const ordersByStatus = {
    pendiente: filteredOrders.filter((o) => o.status === "pendiente"),
    aceptada: filteredOrders.filter((o) => o.status === "aceptada"),
    envio: filteredOrders.filter((o) => o.status === "envio"),
    finalizada: filteredOrders.filter((o) => o.status === "finalizada"),
    rechazada: filteredOrders.filter((o) => o.status === "rechazada"),
    cancelada: filteredOrders.filter((o) => o.status === "cancelada"),
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/order/${orderId}`, {
        status: newStatus,
      });
      dispatch(updateOrder(response.data));
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Error updating order status");
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (!orders.length && !error) {
    return (
      <div className="text-center text-xl text-text-secondary dark:text-text-light mt-12">
        Loading orders (or no orders found)...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-12">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <div className="ml-20">
        <div className="max-w-screen-xl mx-auto px-8 pt-8">
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by code or address..."
                className="w-full pl-10 p-2 rounded-md border border-gray-300 
                           dark:border-gray-700 bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           transition-colors duration-300"
              />
            </div>
          </div>

          {/* Order Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-8">
            <Panel
              title="Pending"
              orders={ordersByStatus.pendiente}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Accepted"
              orders={ordersByStatus.aceptada}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Shipping"
              orders={ordersByStatus.envio}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <Panel
              title="Completed"
              orders={ordersByStatus.finalizada}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Rejected"
              orders={ordersByStatus.rechazada}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Cancelled"
              orders={ordersByStatus.cancelada}
              onStatusChange={handleStatusChange}
              onViewDetails={openOrderDetails}
            />
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeOrderDetails}
          primaryColor={PRIMARY_COLOR}
        />
      )}
    </div>
  );
}

function Panel({ title, orders, onStatusChange, onViewDetails }) {
  return (
    <div
      className="bg-card dark:bg-card-dark rounded-xl 
                 border border-gray-200 dark:border-gray-700 
                 p-6 md:p-8 shadow-lg flex flex-col 
                 transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4 flex items-center gap-2">
        {title}
        <span
          className="text-sm font-normal text-text-secondary dark:text-text-light 
                     bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
        >
          {orders.length}
        </span>
      </h2>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-1">
        {orders.length === 0 ? (
          <p className="text-center text-text-secondary dark:text-text-light">
            No orders
          </p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, onStatusChange, onViewDetails }) {
  const moveToAccepted = () => onStatusChange(order.id, "aceptada");
  const moveToShipping = () => onStatusChange(order.id, "envio");
  const moveToCompleted = () => onStatusChange(order.id, "finalizada");
  const moveToRejected = () => onStatusChange(order.id, "rechazada");
  const moveToCancelled = () => onStatusChange(order.id, "cancelada");

  let actionButtons = null;

  switch (order.status) {
    case "pendiente":
      actionButtons = (
        <div className="flex gap-2">
          <Button onClick={moveToAccepted} variant="primary" size="small">
            Accept
          </Button>
          <Button onClick={moveToRejected} variant="danger" size="small">
            Reject
          </Button>
        </div>
      );
      break;
    case "aceptada":
      actionButtons = (
        <div className="flex gap-2">
          <Button onClick={moveToShipping} variant="primary" size="small">
            Ship
          </Button>
          <Button onClick={moveToCancelled} variant="outline" size="small">
            Cancel
          </Button>
        </div>
      );
      break;
    case "envio":
      actionButtons = (
        <div className="flex gap-2">
          <Button onClick={moveToCompleted} variant="primary" size="small">
            Complete
          </Button>
          <Button onClick={moveToCancelled} variant="outline" size="small">
            Cancel
          </Button>
        </div>
      );
      break;
    default:
      actionButtons = null;
  }

  return (
    <div
      className="bg-background dark:bg-gray-800 rounded-lg 
                 border border-gray-300 dark:border-gray-700 
                 transition-all duration-200 hover:border-orange-500 
                 dark:hover:border-orange-500 group"
    >
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Order #{order.id}
              </h3>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
              {order.deliveryAddress}
            </p>
          </div>
          <span className="text-xs font-medium text-orange-500">
            ${order.price}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-3">
          <button
            onClick={() => onViewDetails(order)}
            className="text-xs text-gray-600 dark:text-gray-400 
                       hover:text-orange-500 dark:hover:text-orange-500 
                       transition-colors duration-200"
          >
            View Details →
          </button>
          {actionButtons}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let bg, textColor;
  switch (status) {
    case "pendiente":
      bg = "#F15A241A";
      textColor = "#F15A24";
      break;
    case "aceptada":
      bg = "#16a34a1A";
      textColor = "#16a34a";
      break;
    case "envio":
      bg = "#2563eb1A";
      textColor = "#2563eb";
      break;
    case "finalizada":
      bg = "#64748b1A";
      textColor = "#475569";
      break;
    case "rechazada":
      bg = "#dc26261A";
      textColor = "#dc2626";
      break;
    case "cancelada":
      bg = "#9CA3AF1A";
      textColor = "#6B7280";
      break;
    default:
      bg = "#F15A241A";
      textColor = "#F15A24";
  }

  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
      style={{
        backgroundColor: bg,
        color: textColor,
      }}
    >
      {status}
    </span>
  );
}

function Button({ children, onClick, variant = "primary", size = "default" }) {
  const baseClasses =
    "font-medium rounded focus:outline-none transition-all duration-200";

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
  };

  let variantClasses;
  switch (variant) {
    case "primary":
      variantClasses = "bg-orange-500 text-white hover:bg-orange-600";
      break;
    case "danger":
      variantClasses = "bg-red-600 text-white hover:bg-red-700";
      break;
    case "outline":
      variantClasses =
        "border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-100";
      break;
    default:
      variantClasses = "bg-gray-200 text-gray-700";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
