"use client";

import React, { useEffect, useState } from "react";
import "./scrollBars.css";

const PRIMARY_COLOR = "#F15A24";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setTimeout(() => {
          const mockData = generateMockOrders(20);
          setOrders(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Error fetching orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-text-secondary dark:text-text-light mt-12">
        Loading orders...
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-xl text-red-600 mt-12">{error}</div>;
  }

  const lowerSearch = searchTerm.toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const codeMatch = order.code.toLowerCase().includes(lowerSearch);
    const addressMatch = order.deliveryAddress.toLowerCase().includes(lowerSearch);
    return codeMatch || addressMatch;
  });

  const ordersByStatus = {
    pendiente: filteredOrders.filter((o) => o.status === "pendiente"),
    aceptada: filteredOrders.filter((o) => o.status === "aceptada"),
    envio: filteredOrders.filter((o) => o.status === "envio"),
    finalizada: filteredOrders.filter((o) => o.status === "finalizada"),
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="ml-20">
        <div className="max-w-screen-xl mx-auto px-8 pt-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-4">
            Orders
          </h1>

          <div className="mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by code or address..."
              className="w-full md:w-1/2 lg:w-1/3 p-2 rounded-md border border-gray-300 
                         dark:border-text-light/10 bg-white dark:bg-background-dark
                         text-text-primary dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-8">
            <Panel
              title="Pending"
              orders={ordersByStatus.pendiente}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
            />
            <Panel
              title="Accepted"
              orders={ordersByStatus.aceptada}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
            />
            <Panel
              title="Shipping"
              orders={ordersByStatus.envio}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <Panel
              title="Completed"
              orders={ordersByStatus.finalizada}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, orders, onStatusChange, accentColor }) {
  return (
    <div className="bg-card dark:bg-card-dark rounded-xl border border-gray-200 dark:border-text-light/10 p-8 shadow-lg flex flex-col">
      <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4 flex items-center gap-2">
        {title}
        <span className="text-sm font-normal text-text-secondary dark:text-text-light bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
          {orders.length}
        </span>
      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-1">
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
              accentColor={accentColor}
            />
          ))
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, onStatusChange }) {
  const moveToAccepted = () => onStatusChange(order.id, "aceptada");
  const moveToShipping = () => onStatusChange(order.id, "envio");
  const moveToCompleted = () => onStatusChange(order.id, "finalizada");

  let actions = null;
  switch (order.status) {
    case "pendiente":
      actions = (
        <div className="flex gap-2 mt-3">
          <Button onClick={moveToAccepted} variant="primary">
            Accept
          </Button>
        </div>
      );
      break;
    case "aceptada":
      actions = (
        <div className="flex gap-2 mt-3">
          <Button onClick={moveToShipping} variant="primary">
            Ship
          </Button>
        </div>
      );
      break;
    case "envio":
      actions = (
        <div className="flex gap-2 mt-3">
          <Button onClick={moveToCompleted} variant="primary">
            Complete
          </Button>
        </div>
      );
      break;
    default:
      actions = null;
  }

  return (
    <div className="bg-background dark:bg-background-dark rounded-xl p-4 border border-gray-200 dark:border-text-light/10 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-text-primary dark:text-white">
          Order #{order.id}
        </h3>
        <span className="text-sm text-text-secondary dark:text-text-light">
          {order.code}
        </span>
      </div>
      <p className="text-xs text-text-secondary dark:text-text-light mb-1">
        Address: {order.deliveryAddress}
      </p>
      <p className="text-xs text-text-secondary dark:text-text-light">
        Price: ${order.price}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <StatusBadge status={order.status} />
      </div>

      {actions}
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
      bg = "#16a34a33";
      textColor = "#16a34a";
      break;
    case "envio":
      bg = "#2563eb33";
      textColor = "#2563eb";
      break;
    case "finalizada":
      bg = "#64748b33";
      textColor = "#475569";
      break;
    default:
      bg = "#F15A241A";
      textColor = "#F15A24";
      break;
  }

  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: bg,
        color: textColor,
      }}
    >
      {status}
    </span>
  );
}

function Button({ children, onClick, variant = "primary" }) {
  const baseClasses =
    "px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1";

  let colorClasses;
  switch (variant) {
    case "primary":
      colorClasses = `bg-[#F15A24] text-white hover:bg-[#d64c1e] focus:ring-[#F15A24]`;
      break;
    default:
      colorClasses = `bg-gray-200 text-gray-700`;
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
      {children}
    </button>
  );
}

function generateMockOrders(count) {
  const statuses = ["pendiente", "aceptada", "envio", "finalizada"];
  const mockData = [];
  for (let i = 1; i <= count; i++) {
    mockData.push({
      id: i,
      code: `OD-00${100 + i}`,
      deliveryAddress: `Street ${i}, City`,
      price: (Math.random() * 100 + 10).toFixed(2),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return mockData;
}
