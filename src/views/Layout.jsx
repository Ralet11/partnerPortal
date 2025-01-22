import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Layout() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">

      <Sidebar />

     
      <div className="ml-5">
     
        <Header />

       
        <main className="max-w-screen-xl mx-auto px-6 mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
