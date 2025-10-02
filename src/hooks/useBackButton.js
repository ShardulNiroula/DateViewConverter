import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';

// Single-responsibility back button handler:
// 1. If on fullscreen clock -> do nothing (component handles it)
// 2. If on home ("/") -> open exit modal
// 3. Else -> ALWAYS navigate to home page (highest priority requirement)
// NOTE: We removed stateful flags to prevent modal leakage across route changes.
export function useBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const lastRegisteredPath = useRef(location.pathname);
  const listenerRef = useRef(null);
  const lastHandledAt = useRef(0);

  useEffect(() => {
    // Clean previous listener (defensive in case Capacitor doesn't de-dupe quickly)
    if (listenerRef.current) {
      listenerRef.current.then(r => r()).catch(() => {});
      listenerRef.current = null;
    }

    const handleBackButton = (event) => {
      // Prevent duplicate handling from rapid/duplicate native events
      const now = Date.now();
      if (now - lastHandledAt.current < 700) return;
      lastHandledAt.current = now;

      // Always prevent default native handling
      if (event && typeof event.preventDefault === 'function') {
        try {
          event.preventDefault();
        } catch (e) {
          // ignore
        }
      }

      const path = location.pathname; // always fresh due to dep array
      
      // 1. Fullscreen: allow component-specific handler (do nothing here)
      if (path === '/clock/fullscreen') {
        return;
      }

      // 2. Home route: show exit modal ONLY here
      if (path === '/') {
        window.dispatchEvent(new CustomEvent('showExitModal'));
        return;
      }

      // 3. HIGH PRIORITY: Any other in-app route MUST navigate to home
      // Use React Router navigation for smooth transitions
      navigate('/');
    };

    listenerRef.current = App.addListener('backButton', handleBackButton);
    lastRegisteredPath.current = location.pathname;

    return () => {
      if (listenerRef.current) {
        listenerRef.current.then(handle => handle.remove()).catch(() => {});
        listenerRef.current = null;
      }
    };
  }, [location.pathname, navigate]);
}