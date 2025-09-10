import React from "react";

const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}   // ✅ shows tick if true
        onChange={onChange}
        className="w-5 h-5 accent-[#8B3C68] cursor-pointer"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;
