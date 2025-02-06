// src/views/ResetPassword.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importa tu Navbar y los modales
import Navbar from '../components/landing/NavBar';
import LoginPartnerModal from '../components/landing/LoginPortalModal';
import JoinPartnerModal from '../components/landing/JoinPartnerModal';
import { AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {
  const { tokenPassword } = useParams();
  const navigate = useNavigate();

  // Estado de los campos del formulario
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ---- Estados para los modales ----
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // ---- Funciones para abrir/cerrar modales ----
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  // ---- Opcional: cambiar de modal Login a modal Signup ----
  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  // ---- Opcional: cambiar de modal Signup a modal Login ----
  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // ---- Manejo del formulario Reset Password ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(`${API_URL}/partner/reset-password/${tokenPassword}`, {
        password: newPassword,
      });
      setSuccessMessage('Your password has been updated successfully!');

      // Redirige a la página principal (o login) luego de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      {/* 
        Navbar con isUser={false} => muestra el botón “Login”. 
        Le pasamos también onLoginClick y onJoinClick 
        para que abra sus respectivos modales.
      */}
      <Navbar
        isUser={false} 
        onLoginClick={openLoginModal}
        onJoinClick={openSignupModal}
      />

      {/* Contenido principal */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

          {errorMessage && (
            <div className="text-red-600 mb-4 text-sm text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-600 mb-4 text-sm text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 
                           rounded-md shadow-sm focus:outline-none 
                           focus:ring-orange-500 focus:border-orange-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* 
        Modales con AnimatePresence 
        (LoginPartnerModal y JoinPartnerModal) 
      */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginPartnerModal
            key="loginModal"
            isOpen={showLoginModal}
            onClose={closeLoginModal}
            onSwitchToSignup={switchToSignup} // para cambiar de login a signup
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSignupModal && (
          <JoinPartnerModal
            key="signupModal"
            isOpen={showSignupModal}
            onClose={closeSignupModal}
            onSwitchToLogin={switchToLogin} // para cambiar de signup a login
          />
        )}
      </AnimatePresence>
    </>
  );
}
