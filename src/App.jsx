import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Clock from './pages/clock/Clock';
import Compare from './pages/compare/Compare';
import Convert from './pages/convert/Convert';
import ClockFullscreen from './pages/clock/ClockFullscreen';
import SupportUs from './pages/supportUs/SupportUs';
import { useBackButton } from './hooks/useBackButton';
import { ModalProvider } from './contexts/ModalContext';
import ExitConfirmationModal from './components/common/Modals/ExitConfirmationModal';
import { useExitConfirmation } from './contexts/ModalContext';
import './App.css';

// App content component that uses the modal context
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  useBackButton();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Additional global back button handler for redundancy
  React.useEffect(() => {
    const handleBackButtonGlobal = () => {
      // This is a backup handler that will ensure navigation to home
      if (location.pathname !== '/' && location.pathname !== '/clock/fullscreen') {
        navigate('/');
        return true; // Indicates we handled the event
      }
      return false; // Let the main handler deal with it
    };

    // Register backup handler with lower priority
    const backButtonListener = CapacitorApp.addListener('backButton', handleBackButtonGlobal);
    
    return () => {
      if (backButtonListener) {
        backButtonListener.then(handle => handle.remove()).catch(() => {});
      }
    };
  }, [location.pathname, navigate]);

  const { isOpen, openExitModal, closeExitModal, confirmExit } = useExitConfirmation();

  // Close the exit modal if not on home page
  React.useEffect(() => {
    if (location.pathname !== '/') {
      closeExitModal();
    }
  }, [location.pathname, closeExitModal]);

  const handleConfirmExit = () => {
    if (!confirmExit()) return;
    // Static import already bundled elsewhere; dynamic ok but we can just call minimize for consistency.
    import('@capacitor/app').then(({ App }) => {
      // Prefer exitApp, fallback to minimize
      if (App.exitApp) App.exitApp(); else App.minimizeApp();
    });
  };

  // Listen for the custom event to show exit modal
  React.useEffect(() => {
    const handler = () => openExitModal();
    window.addEventListener('showExitModal', handler);
    return () => window.removeEventListener('showExitModal', handler);
  }, [openExitModal]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/convert" element={<Convert />} />
    <Route path="/support" element={<SupportUs />} />
        </Route>
        <Route path="/clock/fullscreen" element={<ClockFullscreen />} />
      </Routes>

      <ExitConfirmationModal
        isOpen={isOpen}
        onClose={closeExitModal}
        onConfirmExit={handleConfirmExit}
      />
    </>
  );
}

function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}

export default App;
