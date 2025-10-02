import React from 'react';
import Modal from '../../ui/Modal';
import './ExitConfirmationModal.css';

const ExitConfirmationModal = ({ isOpen, onClose, onConfirmExit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exit App"
      size="small"
      showCloseButton={false}
      className="exit-confirmation-modal"
    >
      <div className="exit-modal-content">
        <div className="exit-modal-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        <div className="exit-modal-text">
          <h3>Are you sure you want to exit?</h3>
          <p>Your session will be lost and you'll need to restart the app.</p>
        </div>

        <div className="exit-modal-actions">
          <button
            type="button"
            className="exit-modal-btn exit-modal-btn-secondary"
            onClick={onClose}
          >
            Stay in App
          </button>
          <button
            type="button"
            className="exit-modal-btn exit-modal-btn-primary"
            onClick={onConfirmExit}
          >
            Exit App
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitConfirmationModal;