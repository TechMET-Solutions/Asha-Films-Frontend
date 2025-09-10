import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { icons } from "../../assets";

export default function ProductionProfileCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);


  console.log(user,"user")
  const [profileProgress, setProfileProgress] = useState(0);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("production_house");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Example progress calculation
      let progress = 0;
      if (parsedUser.company_name) progress += 30;
      if (parsedUser.type_of_work) progress += 30;
      if (parsedUser.profile_photo) progress += 40;
      setProfileProgress(progress);
    }
  }, []);

  // ✅ Navigation items
  const navItems = [
    {
      label: "Add Job Post",
      icon: <img src={icons.picon1} alt="Add Job" width={20} height={20} />,
      path: "/production/add-job",
    },
    {
      label: "Previous Job Post",
      icon: <img src={icons.picon2} alt="Previous Job" width={20} height={20} />,
      path: "/production/previous-job",
    },
    {
      label: "Upcoming Projects",
      icon: <img src={icons.picon3} alt="Upcoming" width={20} height={20} />,
      path: "/production/upcoming",
    },
    {
      label: "Profiles",
      icon: <img src={icons.picon4} alt="Profiles" width={20} height={20} />,
      path: "/production/profiles",
    },
  ];

  const handleProfile = () => {
    navigate("/production/complete-profile");
  };

  const formattedDate = user?.updated_at
    ? new Date(user.updated_at).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "Not updated yet";

  return (
    <div className="w-full md:w-[350px] bg-white p-6 font-primary text-center">
      {/* Profile Progress Circle */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4">
        <svg className="absolute w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-gray-300"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-primary"
            strokeWidth="3"
            strokeDasharray={`${profileProgress}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {user?.image ? (
            <img
              src={user.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover"
              alt="Profile"
            />
          ) : (
            <LuUser className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
          )}
        </div>

        <div className="absolute bottom-0 right-0 text-primary text-xs font-semibold">
          {profileProgress}%
        </div>
      </div>

      {/* User Info */}
      <h2 className="font-bold text-[#333] text-sm sm:text-base">
        {user?.company_name || "User"}
      </h2>
      <p className="text-xs sm:text-sm text-[#333] mb-1">
        Type of Work: {user?.type_of_work || "N/A"}
      </p>
      <p className="text-xs text-[#aaa] mb-4">Last Updated: {formattedDate}</p>

      {/* Complete Profile Button */}
      <button
        onClick={handleProfile}
        className="bg-primary text-white text-sm font-medium py-2 px-4 mb-5 w-full sm:w-auto"
      >
        Complete Profile
      </button>

      {/* Sidebar Navigation */}
      <div className="space-y-2 sm:space-y-3">
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-3 border text-sm transition ${active
          ? "border-primary font-bold text-primary bg-[#fef2f7]"
          : "border-[#ddd] hover:bg-[#f9f9f9] text-[#333]"
        }`}
    >
      <span className="text-base sm:text-lg">{icon}</span>
      {label}
    </button>
  );
}
