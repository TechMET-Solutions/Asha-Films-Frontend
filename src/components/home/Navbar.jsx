import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuAlignJustify, LuX } from "react-icons/lu";
import { icons } from "../../assets";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT US" },
    { path: "/services", label: "SERVICES" },
    { path: "/profiles", label: "PROFILES" },
    { path: "/projects", label: "PROJECTS" },
    { path: "/plans", label: "PLANS" },
    { path: "/contact", label: "CONTACT US" },
    { path: "/clients", label: "OUR CLIENTS" },
  ];

  return (
    <header
      style={{
        background: "linear-gradient(to bottom, #E597B7 12%, #c77496 49%, #8b3c68 85%)"
      }}
      className="text-primary shadow-lg w-full h-auto font-primary" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50">
          <img
            src={icons.logo}
            alt="Logo"
            className="h-12 sm:h-16 md:h-20 w-auto transition-all duration-300 hover:scale-105"
          />
        </Link>

        {/* Tablet/Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          {navItems.map((navItem, index) => (
            <React.Fragment key={navItem.path}>
              <Link
                to={navItem.path}
                className="px-2 py-1 text-xs md:text-sm uppercase lg:text-base font-medium transition-all duration-300 hover:text-tertiary hover:border-2 hover:bg-gradient-to-b from-[#E597B7] via-secondary to-primary hover:scale-105">
                {navItem.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="sm:hidden z-50">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 transition-all"
          >
            {menuOpen ? <LuX size={28} /> : <LuAlignJustify size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden fixed inset-0 bg-primary bg-opacity-95 z-40 transition-all duration-300 ease-in-out transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full pt-20 pb-10 px-6 space-y-6">
          {navItems.map((navItem) => (
            <Link
              key={navItem.path}
              to={navItem.path}
              className="block w-full text-center py-4 text-xl font-semibold text-white border-b border-white border-opacity-20 transition-all duration-300 hover:text-tertiary hover:scale-105"
              onClick={toggleMenu}
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </div>
    </header >
  );
}