import React, { useEffect } from 'react';

/**
 * Reusable Toast Component
 * 
 * @component
 * @param {Object} props
 * @param {string} props.message - The message string to display inside the toast
 * @param {'success' | 'error'} [props.type='success'] - The type of toast (affects colors and icon)
 * @param {function} [props.onClose] - Optional callback triggered when toast is dismissed (manual or automatic)
 * @param {number} [props.duration=4000] - Duration in milliseconds before auto-dismiss (defaults to 4 seconds)
 * @returns {React.ReactElement | null} The rendered toast notification component
 */
export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  // Auto-dismiss logic
  useEffect(() => {
    if (!message) return;
    
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeStyles = {
    success: {
      container: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/90 dark:border-emerald-500/20 dark:text-emerald-300",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      container: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/90 dark:border-rose-500/20 dark:text-rose-300",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600 dark:text-rose-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.success;

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl max-w-sm transition-all duration-300 animate-slide-up ${currentStyle.container}`}>
      {/* Icon */}
      <div className="flex-shrink-0">
        {currentStyle.icon}
      </div>

      {/* Message Text */}
      <div className="flex-1 text-sm font-medium">
        {message}
      </div>

      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          aria-label="Dismiss toast"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
