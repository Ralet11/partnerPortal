"use client"

import React, { useState } from "react"

export default function OrderDetailsModal({ order, onClose, primaryColor }) {
  const [activeTab, setActiveTab] = useState("products")

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  const TabButton = ({ id, label, isActive }) => (
    <button
      className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
        isActive
          ? `border-[#F15A24] text-[#F15A24]`
          : "border-transparent text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  )

  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
        case "processing":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-400"
        case "cancelled":
          return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400"
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      }
    }

    return <span className={`${getStatusColor()} text-xs font-medium px-2.5 py-0.5 rounded-full`}>{status}</span>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl mx-4 bg-white dark:bg-[#1a1d24] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700/50">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Orden #{order.id}</h2>
          <div className="flex items-center space-x-4">
            <StatusBadge status={order.status} />
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#1a1d24]">
          <TabButton id="summary" label="Resumen" isActive={activeTab === "summary"} />
          <TabButton id="products" label="Productos" isActive={activeTab === "products"} />
          <TabButton id="details" label="Detalles" isActive={activeTab === "details"} />
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto bg-gray-50 dark:bg-[#131519]">
          {activeTab === "products" && (
            <div className="space-y-8">
              {order.order_products && order.order_products.length > 0 ? (
                order.order_products.map((op) => (
                  <div
                    key={op.id}
                    className="bg-white dark:bg-[#1a1d24] rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50"
                  >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{op.product?.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {op.product_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(op.price)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {op.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-[#131519] text-sm space-y-6">
                      {op.extras?.extraIngredients && op.extras.extraIngredients.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Extras:</h5>
                          <div className="flex flex-wrap gap-2">
                            {op.extras.extraIngredients.map((extra, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-3 py-1 rounded-full"
                              >
                                {extra.name} {extra.included && "(Incluido)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {op.includedIngredients && op.includedIngredients.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Ingredientes incluidos:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {op.includedIngredients.map((ing, idx) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-3 py-1 rounded-full"
                              >
                                {ing.name} {formatCurrency(ing.price)} {ing.included && "(Incluido)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {op.removedIngredients && op.removedIngredients.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Ingredientes removidos:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {op.removedIngredients.map((removed, idx) => (
                              <span
                                key={idx}
                                className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs px-3 py-1 rounded-full"
                              >
                                {removed.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No hay productos en esta orden.</p>
              )}
            </div>
          )}

          {activeTab === "summary" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Información de Entrega</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Dirección:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{order.deliveryAddress}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Código:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{order.code}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resumen de Costos</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{formatCurrency(order.price)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Fee:</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {formatCurrency(order.deliveryFee)}
                      </span>
                    </p>
                    <p className="flex justify-between text-base font-semibold mt-4">
                      <span className="text-gray-800 dark:text-white">Total:</span>
                      <span className="text-gray-800 dark:text-white">{formatCurrency(order.finalPrice)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Información Adicional</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Partner ID:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.partner_id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.user_id}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Detalles de la Orden</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID de la Orden:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Código:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.code}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Estado:</span>
                    <StatusBadge status={order.status} />
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fecha de Creación:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Última Actualización:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {new Date(order.updatedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.user_id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {order.userName || "No disponible"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {order.userEmail || "No disponible"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Teléfono:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {order.userPhone || "No disponible"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Información del Socio</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Partner ID:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{order.partner_id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nombre del Negocio:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {order.partnerName || "No disponible"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

