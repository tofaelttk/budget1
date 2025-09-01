'use client';

import { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  error
}, ref) => {
  return (
    <div className="field">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        value={value || ''}
        onChange={onChange || (() => {})}
        required={required}
        disabled={disabled}
        className={`form-control ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm mt-2 ml-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
