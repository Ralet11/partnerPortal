"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductDetailsModal({ item, onClose, primaryColor }) {
  if (!item) return null;

  const {
    name,
    price,
    description,
    categoryName,
    available,
    image,
  } = item;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 relative overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div className="p-4" style={{ backgroundColor: `${primaryColor}1A` }}>
          <h2 className="text-xl font-semibold" style={{ color: primaryColor }}>
            Detalles
          </h2>
        </div>

        <div className="p-4 space-y-4">
          {image && <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />}
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{name}</h3>
          {categoryName && <p className="text-sm text-gray-500 dark:text-gray-400">Categoría: {categoryName}</p>}
          {description && <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{description}</p>}
          <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
            Precio: <span className="text-orange-500">${price}</span>
          </p>
          {!available && <span className="text-red-600 font-semibold">No disponible</span>}
        </div>
      </div>
    </div>
  );
}
