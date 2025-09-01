'use client';

import { forwardRef } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'date';
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  error,
  helperText
}, ref) => {
  // Handle empty number inputs properly
  const displayValue = type === 'number' && value === 0 ? '' : value;

  return (
    <div className="field">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        value={displayValue}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-control ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
      />
      {error && (
        <p className="text-red-400 text-sm mt-2 ml-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-2 ml-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
