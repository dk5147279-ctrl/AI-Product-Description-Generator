import React from 'react';

/**
 * Reusable Button Component
 * 
 * @component
 * @param {Object} props
 * @param {string} props.text - The text to display inside the button
 * @param {function} props.onClick - The click handler function
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The visual style variant of the button
 * @returns {React.ReactElement} The rendered button component
 */
export default function Button({ text, onClick, variant = 'primary', className = '', ...rest }) {
  const baseStyle = "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 active:scale-95 focus:ring-violet-500 dark:focus:ring-offset-slate-900",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-900 focus:ring-slate-500 dark:focus:ring-offset-slate-900"
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${selectedVariant} ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}
