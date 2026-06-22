import React from 'react';

/**
 * Reusable Input Component
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.placeholder=''] - The input placeholder text
 * @param {string | number} props.value - The current value of the input
 * @param {function} props.onChange - Event handler for when the value changes
 * @param {string} [props.type='text'] - The HTML input type (e.g., 'text', 'password', 'email')
 * @returns {React.ReactElement} The rendered input component
 */
export default function Input({ placeholder = '', value, onChange, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
      className="w-full rounded-2xl border border-slate-300 bg-white py-3 px-5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
    />
  );
}
