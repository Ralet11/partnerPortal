"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import "./scrollBars.css"
import { useSelector } from "react-redux"
import OrderDetailsModal from "../components/OrderModal"

const PRIMARY_COLOR = "#F15A24"
const API_URL = import.meta.env.VITE_API_URL

export default function Orders() {
  const partner = useSelector((state) => state.partner)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

  console.log(orders)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/order/partner/orders`, {
          headers: {
            Authorization: `Bearer ${partner.token}`,
          },
        })
        setOrders(response.data)
        setLoading(false)
      } catch (err) {
        setError("Error fetching orders")
        setLoading(false)
      }
    }
    fetchOrders()
  }, [partner.token])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/order/${orderId}`, {
        status: newStatus,
      })
      setOrders((prev) => prev.map((o) => (o.id === orderId ? response.data : o)))
    } catch (err) {
      console.error("Error updating order status:", err)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const openOrderDetails = (order) => {
    setSelectedOrder(order)
  }

  const closeOrderDetails = () => {
    setSelectedOrder(null)
  }

  if (loading) {
    return <div className="text-center text-xl text-text-secondary dark:text-text-light mt-12">Loading orders...</div>
  }
  if (error) {
    return <div className="text-center text-xl text-red-600 mt-12">{error}</div>
  }

  const lowerSearch = searchTerm.toLowerCase()
  const filteredOrders = orders.filter((order) => {
    const codeMatch = (order.code || "").toLowerCase().includes(lowerSearch)
    const addressMatch = (order.deliveryAddress || "").toLowerCase().includes(lowerSearch)
    return codeMatch || addressMatch
  })

  const ordersByStatus = {
    pendiente: filteredOrders.filter((o) => o.status === "pendiente"),
    aceptada: filteredOrders.filter((o) => o.status === "aceptada"),
    envio: filteredOrders.filter((o) => o.status === "envio"),
    finalizada: filteredOrders.filter((o) => o.status === "finalizada"),
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <div className="ml-20">
        <div className="max-w-screen-xl mx-auto px-8 pt-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-6">Orders</h1>

          <div className="mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by code or address..."
              className="w-full md:w-1/2 lg:w-1/3 p-2 rounded-md border border-gray-300 
                         dark:border-text-light/10 bg-white dark:bg-[#1e1e1e]
                         text-text-primary dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                         transition-colors duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-8">
            <Panel
              title="Pending"
              orders={ordersByStatus.pendiente}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Accepted"
              orders={ordersByStatus.aceptada}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
              onViewDetails={openOrderDetails}
            />
            <Panel
              title="Shipping"
              orders={ordersByStatus.envio}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
              onViewDetails={openOrderDetails}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <Panel
              title="Completed"
              orders={ordersByStatus.finalizada}
              onStatusChange={handleStatusChange}
              accentColor={PRIMARY_COLOR}
              onViewDetails={openOrderDetails}
            />
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeOrderDetails} primaryColor={PRIMARY_COLOR} />
      )}
    </div>
  )
}

function Panel({ title, orders, onStatusChange, accentColor, onViewDetails }) {
  return (
    <div
      className="bg-card dark:bg-card-dark rounded-xl 
                 border border-gray-200 dark:border-text-light/10 
                 p-6 md:p-8 shadow-lg flex flex-col 
                 transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4 flex items-center gap-2">
        {title}
        <span
          className="text-sm font-normal text-text-secondary dark:text-text-light 
                     bg-gray-100 dark:bg-[#2a2a2a] px-2 py-0.5 rounded-full"
        >
          {orders.length}
        </span>
      </h2>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-1">
        {orders.length === 0 ? (
          <p className="text-center text-text-secondary dark:text-text-light">No orders</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              accentColor={accentColor}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  )
}

function OrderCard({ order, onStatusChange, onViewDetails }) {
  const moveToAccepted = () => onStatusChange(order.id, "aceptada")
  const moveToShipping = () => onStatusChange(order.id, "envio")
  const moveToCompleted = () => onStatusChange(order.id, "finalizada")

  let actionButton = null
  switch (order.status) {
    case "pendiente":
      actionButton = (
        <Button onClick={moveToAccepted} variant="primary" size="small">
          Accept
        </Button>
      )
      break
    case "aceptada":
      actionButton = (
        <Button onClick={moveToShipping} variant="primary" size="small">
          Ship
        </Button>
      )
      break
    case "envio":
      actionButton = (
        <Button onClick={moveToCompleted} variant="primary" size="small">
          Complete
        </Button>
      )
      break
  }

  return (
    <div className="bg-background dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-text-light/10 transition-all duration-200 hover:border-[#F15A24] dark:hover:border-[#F15A24] group">
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium text-text-primary dark:text-white">Order #{order.id}</h3>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-1">{order.deliveryAddress}</p>
          </div>
          <span className="text-xs font-medium text-[#F15A24] dark:text-[#F15A24]">${order.price}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <button
            onClick={() => onViewDetails(order)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-[#F15A24] dark:hover:text-[#F15A24] transition-colors duration-200"
          >
            View Details →
          </button>
          {actionButton}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  let bg, textColor
  switch (status) {
    case "pendiente":
      bg = "#F15A241A"
      textColor = "#F15A24"
      break
    case "aceptada":
      bg = "#16a34a1A"
      textColor = "#16a34a"
      break
    case "envio":
      bg = "#2563eb1A"
      textColor = "#2563eb"
      break
    case "finalizada":
      bg = "#64748b1A"
      textColor = "#475569"
      break
    default:
      bg = "#F15A241A"
      textColor = "#F15A24"
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
  )
}

function Button({ children, onClick, variant = "primary", size = "default" }) {
  const baseClasses = "font-medium rounded focus:outline-none transition-all duration-200"

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
  }

  let variantClasses
  switch (variant) {
    case "primary":
      variantClasses = `bg-[#F15A24] text-white hover:bg-[#d64c1e]`
      break
    case "secondary":
      variantClasses = `bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600`
      break
    case "outline":
      variantClasses = `border border-[#F15A24] text-[#F15A24] bg-transparent hover:bg-[#f15a241a]`
      break
    default:
      variantClasses = `bg-gray-200 text-gray-700`
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${sizeClasses[size]} ${variantClasses}`}>
      {children}
    </button>
  )
}

