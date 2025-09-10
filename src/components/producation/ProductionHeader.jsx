import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { icons } from '../../assets';

function ProductionHeader() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load user info
  useEffect(() => {
    const userData = localStorage.getItem("production_house");
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.company_name || "");
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("production_house");
    navigate("/"); // redirect to home/login
  };

  return (
    // <div
    //   className="w-full h-[120px] sm:h-[140px] md:h-[150px] flex items-center justify-between text-white shadow-md px-4 sm:px-6 md:px-12 relative"
    //   style={{
    //     background: "linear-gradient(to bottom, #E597B7 12%, #c77496 49%, #8b3c68 85%)",
    //     boxShadow: "0px 4px 4px 0px #00000040",
    //   }}
    // >
    //   {/* Left - Logo */}
    //   <div className="flex items-center gap-4 absolute left-4 sm:left-6 md:left-12 top-2 sm:top-4 md:top-3">
    //     <img
    //       src={icons.logo}
    //       alt="Logo"
    //       className="w-[70px] sm:w-[90px] md:w-[114px] h-auto object-contain"
    //     />
    //   </div>

    //   {/* Right - Welcome Dropdown */}
    //   <div
    //     ref={dropdownRef}
    //     className="ml-auto pr-4 sm:pr-6 md:pr-12 text-sm sm:text-base md:text-lg font-medium text-primary text-right relative group cursor-pointer"
    //     onClick={() => setIsOpen((prev) => !prev)}
    //   >
    //     <div className="flex items-center gap-1">
    //       {name ? name : "Welcome"}
    //       <svg
    //         className="w-4 h-4 text-white group-hover:text-gray-300 transition-colors"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 20 20"
    //         fill="currentColor"
    //       >
    //         <path
    //           fillRule="evenodd"
    //           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    //           clipRule="evenodd"
    //         />
    //       </svg>
    //     </div>

    //     {/* Dropdown Menu */}
    //     {isOpen && (
    //       <div className="absolute right-0 mt-2 w-24 shadow-lg bg-primary text-white ring-1 ring-whtext-white ring-opacity-5 z-50 transition-all duration-200 origin-top-right">
    //         <button
    //           onClick={handleLogout}
    //           className="px-4 py-2 text-sm text-white w-full text-left hover:bg-secondary hover:text-white"
    //         >
    //           Log Out
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div
      className="w-full h-[120px] sm:h-[140px] md:h-[150px] flex items-center justify-between text-white shadow-md px-4 sm:px-6 md:px-12 relative"
      style={{
        background:
          "linear-gradient(to bottom, #E597B7 12%, #c77496 49%, #8b3c68 85%)",
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 absolute left-4 sm:left-6 md:left-12 top-2 sm:top-4 md:top-3">
        <img
          src={icons.logo}
          alt="Logo"
          className="w-[70px] sm:w-[90px] md:w-[114px] h-auto object-contain"
        />
      </div>

      {/* Welcome + Dropdown Toggle */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        ref={dropdownRef}
        className="ml-auto cursor-pointer pr-4 sm:pr-6 md:pr-12 text-sm sm:text-base md:text-lg font-medium text-primary text-right relative group"
      >
        <div className="flex items-center gap-1">
          {name ? `Welcome, ${name}` : "Welcome"}
          <svg
            className="w-4 h-4 text-white group-hover:text-gray-300 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-24 shadow-lg bg-primary text-white ring-1 ring-white ring-opacity-5 z-50 transition-all duration-200 origin-top-right">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white w-full text-left"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductionHeader;
