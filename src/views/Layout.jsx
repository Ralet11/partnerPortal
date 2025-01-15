import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Layout() {
  return (
    <div className="min-h-screen bg-background-light text-text-primary">
      {/* Barra lateral fija */}
      <Sidebar />

      {/* Contenedor que "empuja" la vista a la derecha */}
      <div className="ml-20">
        {/* Cabecera (header) */}
        <Header />

        {/* Aquí se muestra el contenido de cada ruta */}
        <main className="max-w-screen-xl mx-auto px-6 mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
