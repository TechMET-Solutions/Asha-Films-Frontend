// components/ui/Loader.jsx
import React from "react";

const Loader = ({ size = 48, color = "border-primary", fullScreen = false }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen" : "h-64"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${color}`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    </div>
  );
};

export default Loader;
