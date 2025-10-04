import React from 'react';
import Modal from '../../ui/Modal';
import './OwnerModal.css';

const OwnerModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Meet the Creator"
      size="medium"
      className="owner-modal"
      disableBackdropClose={true}
    >
      <div className="owner-modal-content">
        <div className="owner-header">
          <div className="owner-avatar">
            <img src="/icon.png" alt="Shardul Niroula" />
          </div>
          <div className="owner-intro">
            <h3>Shardul Niroula</h3>
            <p className="owner-role">Full-Stack Developer</p>
            <p className="owner-tagline">Building tools that make common tasks effortless</p>
          </div>
        </div>

        <div className="owner-details">
          <div className="owner-section about-section">
            <div className="section-header">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h4>About Me</h4>
            </div>
            <div className="about-content">
              <div className="about-card">
                <p>
                  Hi! I'm Shardul, the creator of OClock. As someone who's constantly juggling multiple time zones
                  for work and travel, I built this app to solve a personal problem. OClock helps visualize and
                  convert time across the globe, making scheduling meetings and staying connected a breeze.
                  It's all about making complex time management simple and intuitive.
                </p>
              </div>
            </div>
          </div>

          <div className="owner-section connect-section">
            <div className="section-header">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18.06 7H15V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v3H1.96c-.83 0-1.58.45-1.94 1.17L-2.5 16H0v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h3c.55 0 1-.45 1-1zM3 6h3V4H3v2zm11 10H6V8h8v8zm-6-6h6v4H8v-4z"/>
              </svg>
              <h4>Let's Connect</h4>
            </div>
            <div className="connect-grid">
              <a href="https://github.com/ShardulNiroula" target="_blank" rel="noopener noreferrer" className="connect-card github">
                <div className="connect-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="connect-info">
                  <h5>GitHub</h5>
                </div>
              </a>
              <a href="mailto:shardul@example.com" className="connect-card email">
                <div className="connect-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="connect-info">
                  <h5>Email</h5>
                </div>
              </a>
              {/* <a href="https://linkedin.com/in/shardulniroula" target="_blank" rel="noopener noreferrer" className="connect-card linkedin">
                <div className="connect-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="connect-info">
                  <h5>LinkedIn</h5>
                  <p>Professional network</p>
                </div>
              </a> */}
            </div>
          </div>

          <div className="owner-footer">
            <p className="owner-note">
              Thanks for discovering this easter egg! If you enjoy OClock, consider supporting the project.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OwnerModal;