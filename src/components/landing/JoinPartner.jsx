// JoinPartner.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function JoinPartner() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    location: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
 
    console.log(formData)

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join as a Partner
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/login-partner"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                             rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                             focus:ring-orange-500 focus:border-orange-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                             rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                             focus:ring-orange-500 focus:border-orange-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                             rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                             focus:ring-orange-500 focus:border-orange-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-gray-700"
              >
                Restaurant Name
              </label>
              <div className="mt-1">
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                             rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                             focus:ring-orange-500 focus:border-orange-500"
                  value={formData.restaurantName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                             rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                             focus:ring-orange-500 focus:border-orange-500"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white
                           bg-orange-600 hover:bg-orange-700 focus:outline-none
                           focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign up
              </button>
            </div>
          </form>

  
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-orange-600
                         rounded-md shadow-sm text-sm font-medium text-orange-600
                         hover:bg-orange-100 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-orange-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
