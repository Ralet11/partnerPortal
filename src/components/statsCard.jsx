// Ejemplo: StatsCard.jsx
export default function StatsCard({ title, value, progress, timeLeft, icon: Icon, gradient }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 transition-all duration-300
        ${gradient || 'bg-card-light hover:shadow-lg'}
        group hover:-translate-y-1
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${gradient ? 'text-white/80' : 'text-text-secondary'}`}>
            {title}
          </p>
          <h3 className={`text-2xl font-bold mt-1 ${gradient ? 'text-white' : 'text-text-primary'}`}>
            {value}
          </h3>
          {timeLeft && (
            <p className={`text-sm mt-1 ${gradient ? 'text-white/80' : 'text-text-secondary'}`}>
              {timeLeft}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`
            p-3 rounded-xl
            ${gradient ? 'bg-white/10' : 'bg-primary/5'}
          `}>
            <Icon className={`w-6 h-6 ${gradient ? 'text-white' : 'text-primary'}`} />
          </div>
        )}
      </div>


      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${gradient ? 'text-white/80' : 'text-text-secondary'}`}>
              Progress
            </span>
            <span className={`text-sm font-medium ${gradient ? 'text-white' : 'text-text-primary'}`}>
              {progress}%
            </span>
          </div>
          <div className={`
            h-2 rounded-full overflow-hidden
            ${gradient ? 'bg-white/10' : 'bg-primary/10'}
          `}>
            <div
              className={`
                h-full rounded-full transition-all duration-300
                ${gradient ? 'bg-white' : 'bg-primary'}
              `}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
