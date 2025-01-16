// JoinPartnerModal.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JoinPartnerModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-up data:', formData);
    onClose(); // or keep open if you want them to see a success message
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal box */}
      <motion.div
        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Join as a Partner
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="font-medium text-orange-600 hover:underline"
          >
            Log in
          </button>
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Restaurant Name */}
          <div>
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium text-gray-700"
            >
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.restaurantName}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 
                       border border-transparent rounded-md shadow-sm 
                       text-sm font-medium text-white 
                       bg-orange-600 hover:bg-orange-700 
                       focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-orange-500"
          >
            Sign up
          </button>
        </form>

        {/* Cancel button */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 
                       border border-orange-600 rounded-md shadow-sm 
                       text-sm font-medium text-orange-600 
                       hover:bg-orange-100 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 
                       focus:ring-orange-500"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
