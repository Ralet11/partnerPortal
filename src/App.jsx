// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './views/Layout'
import LandingPage from './views/LandingPage'  
import Dashboard from './views/Dashboard'
import Orders from './views/Orders'
import Statistics from './views/Statistics'
import History from './views/History'
import Settings from './views/Settings'
import JoinPartner from './components/landing/JoinPartnerModal'
import LoginPartner from './components/landing/LoginPortalModal'
import Products from './views/Products'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from './redux/slices/partnerSlice'
import socket from './config/socket'
import ResetPassword from './views/ResetPassword'
import ResetPasswordUser from './views/ResetPasswordUser'
// Importa tu socket


const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const partner = useSelector((state) => state.partner)
  const dispatch = useDispatch()

  // Función para obtener las órdenes desde la API y guardarlas en Redux
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/partner/orders`, {
        headers: {
          Authorization: `Bearer ${partner.token}`,
        },
      })
      dispatch(setOrders(response.data))
    } catch (err) {
      console.error("Error fetching orders in Dashboard:", err)
    }
  }

  // 1) Al montar App o cambiar el token, hacemos un fetch inicial de órdenes
  useEffect(() => {
    if (partner.token) {
      fetchOrders()
    }
  }, [partner.token])

  // 2) Suscribir al evento 'newOrder' de Socket.IO
  useEffect(() => {
    // Si no hay token, no hacemos nada
    if (!partner.token) return

    const handleNewOrder = (newOrderData) => {
      console.log('Se recibió una nueva orden:', newOrderData)
      // Podemos simplemente volver a traer todas las órdenes
      fetchOrders()

      // O, si el payload es suficiente para actualizar manualmente,
      // podrías hacer: dispatch(setOrders([...currentOrders, newOrderData]))
      // según tu preferencia. Pero la forma más simple es re-sincronizar todo.
    }

    socket.on('newOrder', handleNewOrder)

    // Limpieza al desmontar o cambiar de token
    return () => {
      socket.off('newOrder', handleNewOrder)
    }
  }, [partner.token])

  return (
    <Router>
      <Routes>
        {/* Sección PÚBLICA */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/join-partner' element={<JoinPartner />} />
        <Route path='/login-partner' element={<LoginPartner />} />
        <Route path="/reset-password/:tokenPassword" element={<ResetPassword />} />
        <Route path="/reset-password/user/:tokenPassword" element={<ResetPasswordUser />} />
        {/* Sección PRIVADA (Layout + sub-rutas) */}
        <Route path="/partner" element={<Layout />}>
          {/* Redirige a /partner/dashboard */}
          <Route index element={<Navigate to="/partner/dashboard" replace />} />

          {/* Vistas internas */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* RUTA 404 */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  )
}

export default App
