import React from 'react';

const Input = ({ 
  type = "text", 
  name, 
  placeholder = "", 
  value = "", // ✅ default value
  onChange, 
  className = "" 
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value ?? ""}   // ✅ undefined/null handle
        onChange={onChange}
        className={`w-full border border-gray-400 rounded-full px-4 py-2 ${className}`}
      />
    </div>
  );
};

export default Input;
