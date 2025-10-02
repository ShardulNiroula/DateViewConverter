import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const ModalContext = createContext();

// Modal provider component
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = useCallback((modalId, modalData = {}) => {
    setModals(prev => ({
      ...prev,
      [modalId]: { isOpen: true, ...modalData }
    }));
  }, []);

  const closeModal = useCallback((modalId) => {
    setModals(prev => {
      if (!prev[modalId]?.isOpen) return prev;
      return {
        ...prev,
        [modalId]: { ...prev[modalId], isOpen: false }
      };
    });
  }, []);

  const updateModal = useCallback((modalId, updates) => {
    setModals(prev => ({
      ...prev,
      [modalId]: { ...prev[modalId], ...updates }
    }));
  }, []);

  const getModalState = useCallback((modalId) => {
    return modals[modalId] || { isOpen: false };
  }, [modals]);

  const value = {
    modals,
    openModal,
    closeModal,
    updateModal,
    getModalState,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Hook specifically for exit confirmation modal
export const useExitConfirmation = () => {
  const { openModal, closeModal, getModalState } = useModal();

  const openExitModal = () => {
    openModal('exitConfirmation');
  };

  const closeExitModal = () => {
    closeModal('exitConfirmation');
  };

  const confirmExit = () => {
    closeExitModal();
    // Return true to indicate exit was confirmed
    return true;
  };

  return {
    isOpen: getModalState('exitConfirmation').isOpen,
    openExitModal,
    closeExitModal,
    confirmExit,
  };
};