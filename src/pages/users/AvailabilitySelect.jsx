import React, { useState } from "react";
import Select from "react-select";

const categoryOptions = [
  { value: "All", label: "All" },
  { value: "ACTORS & ACTRESS", label: "ACTORS & ACTRESS" },
  { value: "FASHION MODELS", label: "FASHION MODELS" },
  { value: "KIDS", label: "KIDS" },
  { value: "INFLUENCERS", label: "INFLUENCERS" },
  { value: "VOICE OVER", label: "VOICE OVER" },
  { value: "DANCERS", label: "DANCERS" },
  { value: "Freelance Foreigners", label: "Freelance Foreigners" },
  { value: "Talent Agencies", label: "Talent Agencies" },
  { value: "Theater Artist", label: "Theater Artist" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    borderColor: "#d1d5db",
    padding: "2px 4px",
    boxShadow: "none",
    "&:hover": { borderColor: "#8B2F63" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#F6F3EE",
    borderRadius: "0.5rem",
    padding: "2px 6px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#8B2F63",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#8B2F63",
    ":hover": {
      backgroundColor: "#8B2F63",
      color: "white",
    },
  }),
};

const AvailabilitySelect = ({availabilities , setAvailabilities}) => {
//   const [availabilities, setAvailabilities] = useState([]);

  return (
    <div className="mb-6">
      <div className="text-lg font-semibold text-primary mb-2">
        • Availabilities
      </div>
      <Select
        isMulti
        name="availabilities"
        options={categoryOptions}
        value={categoryOptions.filter((opt) =>
          availabilities.includes(opt.value)
        )}
        onChange={(selected) =>
          setAvailabilities(selected.map((s) => s.value))
        }
        placeholder="Select categories..."
        styles={customStyles}
      />

      {/* 👀 Debug Preview */}
      <p className="mt-3 text-sm text-gray-600">
        Selected: {availabilities.join(", ") || "None"}
      </p>
    </div>
  );
};

export default AvailabilitySelect;
