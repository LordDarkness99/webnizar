import React from 'react';

const InputField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  icon: Icon,
  error,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
          </div>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full 
            ${Icon ? 'pl-12' : 'pl-4'} 
            pr-4 
            py-3 
            rounded-xl 
            bg-white/5 
            border 
            ${error ? 'border-red-500/50' : 'border-white/10'} 
            text-white 
            placeholder-gray-400 
            focus:outline-none 
            focus:border-blue-500 
            focus:ring-2 
            focus:ring-blue-500/20 
            transition-all 
            duration-300 
            hover:border-blue-500/30
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
        />
        
        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;