import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
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
} from 'chart.js'
import { ClipboardIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import StatsCard from '../components/StatsCard'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function Dashboard() {
  const [orders] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Orders',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#7C3AED',
        backgroundColor: '#7C3AED20',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#7C3AED',
      },
    ],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1E293B',
        bodyColor: '#64748B',
        borderColor: '#9333EA',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#94A3B810' },
        ticks: { color: '#64748B' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  return (
    <div className="min-h-screen bg-background-light text-text-primary">

      <div className="ml-20">
  

        <div className="max-w-screen-xl mx-auto px-6 mt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">Orders Overview</h2>
                    <p className="text-text-secondary text-sm mt-1">Monthly performance</p>
                  </div>
                  <select className="bg-background-light rounded-xl px-4 py-2 text-sm border-0 focus:ring-2 focus:ring-primary/20">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div className="h-[400px]">
                  <Line options={chartOptions} data={orders} />
                </div>
              </div>
            </div>
            
            <div className="col-span-12 xl:col-span-4 space-y-6">
              <StatsCard
                title="Total Orders"
                value="9,178"
                progress={75}
                timeLeft="This month"
                icon={ClipboardIcon}
                gradient="bg-gradient-to-r from-primary to-primary-dark"
              />
              
              <StatsCard
                title="Average Time"
                value="748"
                progress={65}
                timeLeft="Per order"
                icon={ArrowTrendingUpIcon}
                gradient="bg-gradient-to-r from-secondary to-secondary-dark"
              />
            </div>
            
            <div className="col-span-12 md:col-span-4">
              <StatsCard
                title="Pending Orders"
                value="156"
                progress={45}
                timeLeft="2 days left"
                icon={ClipboardIcon}
              />
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
              <StatsCard
                title="Completed"
                value="1,204"
                progress={90}
                timeLeft="1 day left"
                icon={CheckCircleIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

