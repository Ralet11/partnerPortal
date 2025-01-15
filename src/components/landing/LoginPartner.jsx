// LoginPartner.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPartner() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de autenticación
    console.log('Datos de login:', formData)
    // Si todo va bien, podrías hacer:
    // navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Título y link a registro */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Partner Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/join-partner"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            create an account
          </Link>
        </p>
      </div>

      {/* Formulario */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
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
                  className="appearance-none block w-full px-3 py-2 
                             border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none 
                             focus:ring-orange-500 focus:border-orange-500
                             text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 
                             border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none 
                             focus:ring-orange-500 focus:border-orange-500
                             text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Botón de Login */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 
                           border border-transparent rounded-md shadow-sm 
                           text-sm font-medium text-white 
                           bg-orange-600 hover:bg-orange-700 
                           focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-orange-500"
              >
                Log in
              </button>
            </div>
          </form>

          {/* Botón para regresar al Dashboard */}
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
