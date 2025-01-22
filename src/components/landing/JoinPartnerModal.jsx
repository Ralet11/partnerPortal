// JoinPartnerModal.jsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

export default function JoinPartnerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    address: '',
    latitude: null,
    longitude: null,
  });

  // Usamos useRef para mantener la instancia de Autocomplete
  const autocompleteRef = useRef(null);

  // Manejador de cambios para inputs de texto
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando se carga el componente Autocomplete, guardamos la instancia
  const handleOnLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Cuando el usuario selecciona una dirección (place_changed)
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address || prev.address,
          latitude: lat,
          longitude: lng,
        }));
      }
    }
  };

  // Envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Inquiry data:', formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/partner/request`, 
        formData
      );
      
      if (response.status === 200) {
        alert('Thanks for your interest! We will contact you soon.');
        onClose(); 
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <motion.div
        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Become a Partner
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          If you would like to join our team of collaborators, please let us know 
          how you found us and we will get in touch with you as soon as possible.
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Phone (optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
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

          {/* Address con Google Autocomplete */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <LoadScript
              googleMapsApiKey="AIzaSyAvritMA-llcdIPnOpudxQ4aZ1b5WsHHUc"
              libraries={libraries}
            >
              <Autocomplete
                onLoad={handleOnLoad}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 
                             border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none 
                             focus:ring-orange-500 focus:border-orange-500
                             text-sm"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Autocomplete>
            </LoadScript>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="appearance-none block w-full px-3 py-2 
                         border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none 
                         focus:ring-orange-500 focus:border-orange-500
                         text-sm"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 
                       border border-transparent rounded-md shadow-sm 
                       text-sm font-medium text-white 
                       bg-orange-600 hover:bg-orange-700 
                       focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-orange-500"
          >
            Send
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
