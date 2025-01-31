"use client";

import React, { useState } from "react";
import "./scrollBars.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Importa tus queries y mutations
import {
  useGetPartnerProductsQuery,
  useGetPartnerIngredientsQuery,
  useUpdatePartnerIngredientMutation,
} from "../services/request/PartnerApi";

import ProductDetailsModal from "../components/ProductModal";

// Estilos y constantes
const PRIMARY_COLOR = "#F15A24";

export default function Products() {
  // ───────────────────────────────────────────────────────────────────────────
  // 1. Estados y hooks de RTK Query para Productos
  // ───────────────────────────────────────────────────────────────────────────
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
    // ⚠️ Nuevo: extraemos refetch para recargar los productos
    refetch: refetchProducts
  } = useGetPartnerProductsQuery();

  // Para abrir modal de detalles de un producto
  const [selectedItem, setSelectedItem] = useState(null);

  // Para filtrar productos
  const [productSearchTerm, setProductSearchTerm] = useState("");
  // Para manejar inStock manual/optimista en productos (ejemplo)
  const [stockStatus, setStockStatus] = useState({});

  // ───────────────────────────────────────────────────────────────────────────
  // 2. Estados y hooks de RTK Query para Ingredientes
  // ───────────────────────────────────────────────────────────────────────────
  const {
    data: ingredientData,
    error: ingredientError,
    isLoading: ingredientLoading,
  } = useGetPartnerIngredientsQuery();

  const [updatePartnerIngredient] = useUpdatePartnerIngredientMutation();

  // Para filtrar ingredientes
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");
  // Manejo optimista para el stock de ingredientes
  const [localIngredientStock, setLocalIngredientStock] = useState({});

  // ───────────────────────────────────────────────────────────────────────────
  // 3. Tab actual: "products" o "ingredients"
  // ───────────────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("products");

  // ───────────────────────────────────────────────────────────────────────────
  // 4. Manejadores de Productos
  // ───────────────────────────────────────────────────────────────────────────
  const openDetails = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

  const toggleStock = (product) => {
    // Aquí podrías llamar a tu lógica de "partnerProduct" para inStock
    const updatedStockStatus = {
      ...stockStatus,
      [product.id]: !stockStatus[product.id],
    };
    setStockStatus(updatedStockStatus);

    // (Ejemplo) Llamar a endpoint de update partnerProduct (si tuvieras)
    // ...
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 5. Manejadores de Ingredientes
  // ───────────────────────────────────────────────────────────────────────────
  const handleToggleIngredientStock = async (ingredient) => {
    const currentStatus =
      localIngredientStock[ingredient.id] ?? ingredient.inStock;
    const newStatus = !currentStatus;

    // 1. Actualizamos UI de forma optimista para ingredientes
    setLocalIngredientStock((prev) => ({
      ...prev,
      [ingredient.id]: newStatus,
    }));

    try {
      // 2. Llamada a la API para actualizar partnerIngredient en BD
      await updatePartnerIngredient({
        ingredient_id: ingredient.id,
        inStock: newStatus,
      }).unwrap();

      // 3. ⚠️ REFETCH de productos para ver el cambio en su stock
      //    (Esto forzará una nueva consulta al endpoint /partner/products)
      refetchProducts();

    } catch (error) {
      console.error("Error al actualizar ingrediente", error);

      // 4. Revertir si falla
      setLocalIngredientStock((prev) => ({
        ...prev,
        [ingredient.id]: currentStatus,
      }));
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 6. Renderizado condicional según el tab activo
  // ───────────────────────────────────────────────────────────────────────────
  function renderProductsView() {
    if (productLoading) {
      return (
        <div className="text-center text-xl text-text-secondary dark:text-text-light mt-12">
          Cargando productos...
        </div>
      );
    }

    if (productError) {
      return (
        <div className="text-center text-xl text-red-600 mt-12">
          Error al obtener productos
        </div>
      );
    }

    const categories = productData?.cat
      ? Object.keys(productData.cat).map((name) => ({
          name,
          items: productData.cat[name],
        }))
      : [];

    // Filtro para productos
    const lowerSearch = productSearchTerm.toLowerCase();
    const filteredCategories = categories.map((cat) => {
      const filteredItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(lowerSearch)
      );
      return { ...cat, items: filteredItems };
    });

    return (
      <div>
        {/* Barra de búsqueda de productos */}
        <div className="relative w-full md:w-1/2 lg:w-1/3 mb-8">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full pl-10 p-2 rounded-md border border-gray-300 
                       dark:border-gray-700 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors duration-300"
          />
        </div>

        {/* Grid de categorías de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              className="bg-card dark:bg-card-dark rounded-xl 
                         border border-gray-200 dark:border-gray-700 
                         p-6 md:p-8 shadow-lg flex flex-col 
                         transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4 flex items-center gap-2">
                {cat.name}
                <span
                  className="text-sm font-normal text-text-secondary dark:text-text-light 
                             bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
                >
                  {cat.items.length}
                </span>
              </h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-1">
                {cat.items.length === 0 ? (
                  <p className="text-center text-text-secondary dark:text-text-light">
                    Sin productos
                  </p>
                ) : (
                  cat.items.map((item) => {
                    const isOutOfStock =
                      stockStatus[item.id] ?? item.inStock === false;

                    return (
                      <div
                        key={item.id}
                        className={`bg-background dark:bg-gray-800 rounded-lg 
                                   border border-gray-300 dark:border-gray-700 
                                   transition-all duration-200 hover:border-orange-500 
                                   dark:hover:border-orange-500 group p-3 
                                   ${
                                     isOutOfStock
                                       ? "bg-red-100 dark:bg-red-900 border-red-500"
                                       : ""
                                   }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              ${item.price}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <label className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                              <input
                                type="checkbox"
                                checked={!isOutOfStock}
                                onChange={() => toggleStock(item)}
                                className="w-4 h-4 accent-orange-500"
                              />
                              <span>
                                {isOutOfStock ? "Agotado" : "En stock"}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-3">
                          <button
                            onClick={() =>
                              openDetails({ ...item, available: !isOutOfStock })
                            }
                            className="text-xs text-gray-600 dark:text-gray-400 
                                       hover:text-orange-500 dark:hover:text-orange-500 
                                       transition-colors duration-200"
                          >
                            Ver detalles →
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalles del producto */}
        {selectedItem && (
          <ProductDetailsModal
            item={selectedItem}
            onClose={closeDetails}
            primaryColor={PRIMARY_COLOR}
          />
        )}
      </div>
    );
  }

  function renderIngredientsView() {
    if (ingredientLoading) {
      return (
        <div className="text-center text-xl text-text-secondary dark:text-text-light mt-12">
          Cargando ingredientes...
        </div>
      );
    }

    if (ingredientError) {
      return (
        <div className="text-center text-xl text-red-600 mt-12">
          Error al obtener ingredientes
        </div>
      );
    }

    // data es la lista de ingredientes del partner: [{ id, name, inStock }, ...]
    const ingredients = ingredientData || [];

    // Filtro por nombre
    const lowerSearch = ingredientSearchTerm.toLowerCase();
    const filteredIngredients = ingredients.filter((ing) =>
      ing.name.toLowerCase().includes(lowerSearch)
    );

    return (
      <div>
        {/* Barra de búsqueda de ingredientes */}
        <div className="relative w-full md:w-1/2 lg:w-1/3 mb-8">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            value={ingredientSearchTerm}
            onChange={(e) => setIngredientSearchTerm(e.target.value)}
            placeholder="Buscar ingrediente..."
            className="w-full pl-10 p-2 rounded-md border border-gray-300 
                       dark:border-gray-700 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors duration-300"
          />
        </div>

        {/* Lista de ingredientes */}
        <div className="bg-card dark:bg-card-dark rounded-xl 
                       border border-gray-200 dark:border-gray-700 
                       p-6 md:p-8 shadow-lg flex flex-col 
                       transition-colors duration-300 w-full"
        >
          <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
            Ingredientes
            <span
              className="ml-2 text-sm font-normal text-text-secondary dark:text-text-light 
                         bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
            >
              {filteredIngredients.length}
            </span>
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar flex-1">
            {filteredIngredients.length === 0 ? (
              <p className="text-center text-text-secondary dark:text-text-light">
                Sin ingredientes
              </p>
            ) : (
              filteredIngredients.map((ingredient) => {
                const inStockLocal =
                  localIngredientStock[ingredient.id] ?? ingredient.inStock;
                const isOutOfStock = !inStockLocal;

                return (
                  <div
                    key={ingredient.id}
                    className={`bg-background dark:bg-gray-800 rounded-lg 
                               border border-gray-300 dark:border-gray-700 
                               transition-all duration-200 hover:border-orange-500 
                               dark:hover:border-orange-500 group p-3 
                               ${
                                 isOutOfStock
                                   ? "bg-red-100 dark:bg-red-900 border-red-500"
                                   : ""
                               }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {ingredient.name}
                      </h3>
                      <div className="flex items-center">
                        <label className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                          <input
                            type="checkbox"
                            checked={!isOutOfStock}
                            onChange={() =>
                              handleToggleIngredientStock(ingredient)
                            }
                            className="w-4 h-4 accent-orange-500"
                          />
                          <span>
                            {isOutOfStock ? "Agotado" : "En stock"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 7. Render principal: pestañas y contenido
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      <div className="ml-20 max-w-screen-xl mx-auto px-8 pt-8">
        {/* Controles de pestañas */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-md font-semibold 
                        ${
                          activeTab === "products"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-4 py-2 rounded-md font-semibold 
                        ${
                          activeTab === "ingredients"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        }`}
          >
            Ingredientes
          </button>
        </div>

        {/* Vista condicional */}
        {activeTab === "products" ? renderProductsView() : renderIngredientsView()}
      </div>
    </div>
  );
}
