import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/landing/NavBar';

// 1. Importamos el modal y AnimatePresence
import JoinPartnerModal from '../components/landing/JoinPartnerModal';
import { AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function ResetPasswordUser() {
  const { tokenPassword } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 2. Estado para mostrar/ocultar el modal de Join
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Funciones para abrir/cerrar el modal Join
  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  // (Opcional) Si quisieras tener el cambio entre Login y Signup:
  // const switchToLogin = () => {
  //   setShowSignupModal(false);
  //   setShowLoginModal(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(`${API_URL}/user/reset-password/${tokenPassword}`, {
        password: newPassword,
      });
      setSuccessMessage('¡Tu contraseña se ha actualizado exitosamente!');

      // Opcional: redirigir al login luego de unos segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ha ocurrido un error. Por favor intenta nuevamente.');
      }
    }
  };

  return (
    <>
      {/*
        3. Pasamos la función "openSignupModal" como onJoinClick.
        Además, si no quieres mostrar el botón de "Login" en esta página,
        puedes usar la prop "isUser" o "hideJoin" según tu necesidad.
      */}
      <Navbar 
        isUser={true}           // Oculta el botón “Login”
        onJoinClick={openSignupModal} // Llama a tu función para abrir el modal
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Restablecer contraseña
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            En esta página podrás establecer una nueva contraseña para tu cuenta.
            Solo ingresa la nueva contraseña que deseas usar y haz clic en 
            <strong> “Actualizar contraseña”</strong> para completar el proceso.
          </p>

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
                Nueva contraseña
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
              Actualizar contraseña
            </button>
          </form>
        </div>
      </div>

      {/*
        4. Colocamos el modal de Join con AnimatePresence
      */}
      <AnimatePresence>
        {showSignupModal && (
          <JoinPartnerModal
            key="signupModal"
            isOpen={showSignupModal}
            onClose={closeSignupModal}
            // onSwitchToLogin={switchToLogin} // si quieres manejarlo
          />
        )}
      </AnimatePresence>
    </>
  );
}
