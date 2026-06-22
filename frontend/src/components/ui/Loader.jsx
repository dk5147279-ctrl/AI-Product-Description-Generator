import React from 'react';

/**
 * Reusable Loader Component
 * 
 * @component
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size variant of the spinner
 * @returns {React.ReactElement} The rendered loader spinner component
 */
export default function Loader({ size = 'md' }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-solid border-violet-600 border-t-transparent ${selectedSize}`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
