import { useState, useCallback } from 'react';

export const useExitConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const confirmExit = useCallback(() => {
    setIsOpen(false);
    // The actual exit logic will be handled by the Capacitor App.minimizeApp() or similar
    return true;
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    confirmExit,
  };
};