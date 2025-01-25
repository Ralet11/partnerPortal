"use client"

import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import { ClipboardIcon, ArrowTrendingUpIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

import StatsCard from "../components/statsCard"
import { useSelector, useDispatch } from "react-redux"

// IMPORTA TU ACCIÓN PARA GUARDAR ÓRDENES EN EL STATE
import { setOrders } from "../redux/slices/partnerSlice"

import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const API_URL = import.meta.env.VITE_API_URL // Ajusta esto si tu variable es distinta

export default function Dashboard() {
  const dispatch = useDispatch()
  const partner = useSelector((state) => state.partner)

  // Ejemplo de estado local para el gráfico de órdenes (datos fijos de ejemplo)
  const [ordersData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        fill: true,
        label: "Orders",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#F15A24",
        backgroundColor: "rgba(241, 90, 36, 0.08)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#F15A24",
      },
    ],
  })

  // Llamada a la API para traer las órdenes y guardarlas en el estado global
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/order/partner/orders`, {
          headers: {
            Authorization: `Bearer ${partner.token}`,
          },
        })
        // Aquí actualizas el estado global de partner, guardando las órdenes
        dispatch(setOrders(response.data))
      } catch (err) {
        console.error("Error fetching orders in Dashboard:", err)
      }
    }

    if (partner.token) {
      fetchOrders()
    }
  }, [partner.token, dispatch])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: (theme) => (theme.dark ? "#171923" : "#FFFFFF"),
        titleColor: (theme) => (theme.dark ? "#FFFFFF" : "#1E293B"),
        bodyColor: (theme) => (theme.dark ? "#94A3B8" : "#64748B"),
        borderColor: "#F15A24",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (theme) => (theme.dark ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.2)"),
        },
        ticks: {
          color: (theme) => (theme.dark ? "#94A3B8" : "#64748B"),
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: (theme) => (theme.dark ? "#94A3B8" : "#64748B"),
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="ml-20">
        <div className="max-w-screen-xl mx-auto px-6 mt-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Card con gráfico */}
            <div className="col-span-12 xl:col-span-8">
              <div className="bg-card dark:bg-card-dark rounded-xl border border-gray-200 dark:border-text-light/10 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary dark:text-white">Orders Overview</h2>
                    <p className="text-sm text-text-secondary dark:text-text-light mt-1">Monthly performance</p>
                  </div>
                  <select className="bg-background dark:bg-background-dark rounded-xl px-4 py-2 text-sm border border-gray-200 dark:border-text-light/10 text-text-primary dark:text-white">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div className="h-[400px]">
                  <Line options={chartOptions} data={ordersData} />
                </div>
              </div>
            </div>

            {/* StatsCards */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              <StatsCard title="Total Orders" value="9,178" progress={75} timeLeft="This month" icon={ClipboardIcon} />
              <StatsCard
                title="Average Time"
                value="748"
                progress={65}
                timeLeft="Per order"
                icon={ArrowTrendingUpIcon}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <StatsCard title="Pending Orders" value="156" progress={45} timeLeft="2 days left" icon={ClipboardIcon} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatsCard
                title="In Progress"
                value="84"
                progress={13}
                timeLeft="5 days left"
                icon={ArrowTrendingUpIcon}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatsCard title="Completed" value="1,204" progress={90} timeLeft="1 day left" icon={CheckCircleIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
