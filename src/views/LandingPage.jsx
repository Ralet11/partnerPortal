// LandingPage.jsx
import { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';

// Importamos los modales
import LoginPartnerModal from '../components/landing/LoginPortalModal';
import JoinPartnerModal from '../components/landing/JoinPartnerModal';
import { AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  console.log(import.meta.env.VITE_API_URL);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // -- Open/Close for Login
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  // -- Open/Close for Signup
  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  // -- Switch from Login -> Signup
  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  // -- Switch from Signup -> Login
  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={openLoginModal} onJoinClick={openSignupModal} />
      <Hero onJoinClick={openSignupModal} />
      <Features />
      <Footer />

      {/* AnimatePresence handles mounting/unmounting animations */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginPartnerModal
            key="loginModal" // for AnimatePresence
            isOpen={showLoginModal}
            onClose={closeLoginModal}
            onSwitchToSignup={switchToSignup}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSignupModal && (
          <JoinPartnerModal
            key="signupModal" // for AnimatePresence
            isOpen={showSignupModal}
            onClose={closeSignupModal}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
