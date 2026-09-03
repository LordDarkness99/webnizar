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
        <label className="block text-xs font-medium text-[#86868b] uppercase tracking-wider">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
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
            py-3.5 
            rounded-2xl 
            bg-white/5 
            border 
            ${error ? 'border-red-500/50' : 'border-white/10'} 
            text-[#f5f5f7] 
            placeholder-[#86868b] 
            text-sm 
            focus:outline-none 
            focus:border-[#0071E3]/60 
            focus:bg-white/10 
            transition-all 
            duration-300 
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
        />
        
        {error && (
          <p className="text-red-400 text-xs mt-1 font-normal">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;