import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { icons } from "../../assets";

export default function UserProfileCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [profileProgress, setProfileProgress] = useState(0);

   console.log(user,"user")

  // ✅ Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Example: calculate profile progress dynamically
      let progress = 0;
      if (parsedUser.name) progress += 25;
      if (parsedUser.profile_photo) progress += 25;
      if (parsedUser.profileType) progress += 25;
      if (parsedUser.updated_at) progress += 25;
      setProfileProgress(progress);
    }
  }, []);

  // ✅ Navigation items
  const navItems = [
    {
      label: "Popular Casting Calls",
      icon: <img src={icons.uicon1} alt="Add Job" width={20} height={20} />,
      path: "/user/popular-casting-calls",
    },
    {
      label: "My Applications",
      icon: <img src={icons.uicon2} alt="Previous Job" width={20} height={20} />,
      path: "/user/my-application",
    },
    {
      label: "New Casting Calls for You",
      icon: <img src={icons.uicon3} alt="Upcoming" width={20} height={20} />,
      path: "/user/new-casting-calls",
    },
    {
      label: "Plans",
      icon: <img src={icons.uicon4} alt="Profiles" width={20} height={20} />,
      path: "/user/plans",
    },
    {
      label: "My Subscription",
      icon: <img src={icons.uicon4} alt="Profiles" width={20} height={20} />,
      path: "/user/my-subscription",
    },
  ];

  const handleProfile = () => {
    navigate("/user/complate-profile");
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
    <div className="w-full md:w-[350px] bg-white shadow-lg p-6 rounded-lg font-primary text-center">
      {/* Profile Progress Circle */}
      <div className="relative w-28 h-28 mx-auto mb-4">
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
              className="w-20 h-20 rounded-full object-cover"
              alt="Profile"
            />
          ) : (
            <LuUser className="w-20 h-20 text-gray-400" />
          )}
        </div>

        <div className="absolute bottom-0 right-0 text-primary text-xs font-semibold">
          {profileProgress}%
        </div>
      </div>

      {/* User Info */}
      <h2 className="font-bold text-[#333] text-base">
        {user?.name || "User"}
      </h2>
      <p className="text-sm text-[#333] mb-1">
        Profile Type: {user?.type || "N/A"}
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
      className={`flex items-center gap-3 w-full px-3 py-3 border border-[#ddd] text-sm transition ${active ? "border-primary font-bold text-[#333]" : "hover:bg-[#f9f9f9] text-[#333]"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
