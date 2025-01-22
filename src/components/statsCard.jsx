export default function StatsCard({ title, value, progress, timeLeft, icon: Icon }) {
  return (
    <div className="bg-card dark:bg-card-dark rounded-xl border border-gray-200 dark:border-text-light/10 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary dark:text-text-light">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary dark:text-white mt-1">{value}</h3>
        </div>
        <div className="bg-background dark:bg-background-dark p-3 rounded-xl">
          <Icon className="w-6 h-6 text-primary dark:text-primary-light" />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-secondary dark:text-text-light">Progress</span>
          <span className="text-text-primary dark:text-white font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-background dark:bg-background-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-primary dark:bg-primary-light rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-text-secondary dark:text-text-light mt-4">{timeLeft}</p>
    </div>
  )
}

