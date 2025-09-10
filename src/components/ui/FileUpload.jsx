import React, { useRef, useState } from "react";
import { FiImage, FiVideo } from "react-icons/fi";

const FileUpload = ({ label, name, type = "image", onChange, className="" }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      onChange(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-between items-center border rounded-full px-4 py-3 cursor-pointer hover:border-primary transition w-full border-gray-400  ${className}`}
    >
      <span className="text-gray-600">
        {fileName ? fileName : label}
      </span>
      {type === "image" ? (
        <FiImage className="text-gray-500 text-xl" />
      ) : (
        <FiVideo className="text-gray-500 text-xl" />
      )}

      {/* hidden file input */}
      <input
        type="file"
        name={name}
        accept={type === "image" ? "image/*" : "video/*"}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
