// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './views/Layout'
import LandingPage from './views/LandingPage'  // tu landing
// tu login (opcional)
import Dashboard from './views/Dashboard'
import Orders from './views/Orders'
import Statistics from './views/Statistics'
import History from './views/History'
import Settings from './views/Settings'   // <-- IMPORT del nuevo componente
import JoinPartner from './components/landing/JoinPartnerModal'
import LoginPartner from './components/landing/LoginPortalModal'

function App() {
  return (
    <Router>
      <Routes>
        {/* Sección PÚBLICA */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/join-partner' element={<JoinPartner />} />
        <Route path='/login-partner' element={<LoginPartner />} />

        {/* Sección PRIVADA (Layout + sub-rutas) */}
        <Route path="/partner" element={<Layout />}>
          {/* Si alguien va a /partner, redirige a /partner/dashboard */}
          <Route index element={<Navigate to="/partner/dashboard" replace />} />

          {/* Vistas internas */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />  {/* <-- NUEVA RUTA */}
        </Route>

        {/* RUTA 404 (opcional) */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  )
}

export default App
