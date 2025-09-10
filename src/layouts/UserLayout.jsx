import { UserHeader, UserProfileCard } from "../components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

const UserLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Import */}
      <UserHeader />

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-6 px-4 py-6 font-secondary flex-grow">
        {/* Sidebar Toggle Button (mobile) */}
        <button
          className="md:hidden flex items-center gap-2 text-primary font-medium mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          Menu
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full w-84 bg-white shadow-md transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
          <UserProfileCard
            onSectionChange={(path) => {
              navigate(path);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content from Routes */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-5 overflow-y-auto max-h-[95vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;