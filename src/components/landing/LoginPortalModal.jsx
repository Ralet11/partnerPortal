import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importamos Redux hooks y el action que configuramos:
import { useDispatch } from 'react-redux';
import { setPartnerData } from '../../redux/slices/partnerSlice';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPartnerModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}) {
  // Estado para indicar si estamos en modo "olvidé la contraseña" o no
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Estado para formulario de login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Estado para el email que se ingresa al solicitar reset
  const [resetEmail, setResetEmail] = useState('');

  // Manejo de errores genérico
  const [errorMessage, setErrorMessage] = useState('');
  // Opcional: mostrar un mensaje de éxito tras enviar el email
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----------------- LOGIN -----------------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { data } = await axios.post(`${API_URL}/partner/login`, formData);

      const { partner, token } = data;

      dispatch(
        setPartnerData({
          id: partner.id,
          name: partner.name,
          email: partner.email,
          latitude: partner.latitude,
          longitude: partner.longitude,
          token,
        })
      );

      navigate('/partner/dashboard');
      onClose();
    } catch (error) {
      console.error('Error al hacer login:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  // ----------------- FORGOT PASSWORD -----------------
  const handleForgotPassword = () => {
    // Mostrar la vista para ingresar el email
    setShowForgotPassword(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Enviar email de reset
  const handleSubmitResetEmail = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(`${API_URL}/partner/requestPasswordReset`, {
        email: resetEmail,
      });
      setSuccessMessage(
        'If an account with that email exists, a recovery link has been sent.'
      );
    } catch (error) {
      console.log(error);
      // Podrías mostrar un error si quieres diferenciar
      // Pero a veces se responde lo mismo ("te enviamos un email") por seguridad
      setErrorMessage('Error sending recovery email. Please try again later.');
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
        {!showForgotPassword ? (
          <>
            {/* LOGIN */}
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Partner Login
            </h2>

            <p className="mt-2 text-center text-sm text-gray-700">
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToSignup();
                }}
                className="font-medium text-orange-600 hover:underline"
              >
                Sign up
              </button>
            </p>

            {/* Mensajes */}
            {errorMessage && (
              <div className="mt-4 text-sm text-red-600 text-center">
                {errorMessage}
              </div>
            )}

            <form className="mt-4 space-y-4" onSubmit={handleSubmitLogin}>
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
            </form>

            {/* Link de Forgot Password */}
            <div className="mt-4 text-center">
              <button
                onClick={handleForgotPassword}
                className="text-sm text-orange-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Botón de Cancel */}
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
          </>
        ) : (
          <>
            {/* FORGOT PASSWORD: solo pide email */}
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Recover Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-700">
              Please enter the email associated with your account.
            </p>

            {/* Mensajes */}
            {errorMessage && (
              <div className="mt-4 text-sm text-red-600 text-center">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mt-4 text-sm text-green-600 text-center">
                {successMessage}
              </div>
            )}

            <form className="mt-4 space-y-4" onSubmit={handleSubmitResetEmail}>
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="reset-email"
                  name="reset-email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 
                           border border-gray-300 rounded-md shadow-sm 
                           placeholder-gray-400 focus:outline-none 
                           focus:ring-orange-500 focus:border-orange-500
                           text-sm"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 
                         border border-transparent rounded-md shadow-sm 
                         text-sm font-medium text-white 
                         bg-orange-600 hover:bg-orange-700 
                         focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-orange-500"
              >
                Send Recovery Link
              </button>
            </form>

            <div className="mt-4">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="w-full flex justify-center py-2 px-4 
                         border border-orange-600 rounded-md shadow-sm 
                         text-sm font-medium text-orange-600 
                         hover:bg-orange-100 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 
                         focus:ring-orange-500"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
