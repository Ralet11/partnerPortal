// Hero.jsx
export default function Hero({ onJoinClick }) {
    return (
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/fondo.jpeg')", // Adjust path as needed
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  
        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Delicious burgers <br />
            <span
              className="text-orange-400"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
            >
              delivered to you
            </span>
          </h1>
          <p
            className="mt-4 text-white max-w-2xl text-base sm:text-lg md:text-xl"
            style={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)",
            }}
          >
            Experience the best burgers in town. Made with premium ingredients and
            cooked to perfection. Join our network of satisfied customers and
            partners.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="#menu"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium shadow-lg"
            >
              View Menu
            </a>
            <button
              onClick={onJoinClick}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-6 py-3 rounded-md font-medium shadow-lg"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    );
  }
  