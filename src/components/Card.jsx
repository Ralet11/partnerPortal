export default function Card({ children, className = '' }) {
    return (
      <div className={`bg-card-DEFAULT rounded-2xl shadow-sm p-4 ${className}`}>
        {children}
      </div>
    )
  }
  
  