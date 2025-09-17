// components/ProfileCard.jsx
import React from "react";

const ProfileCard = ({
    image = "",
    name = "Unknown",
    age = "N/A",
    gender = "N/A",
    location = "N/A",
    onAction = () => {},
}) => {
    return (
        <div className="max-w-xs bg-white shadow-md p-2  overflow-hidden flex flex-col transform transition duration-300 hover:border-4 hover:border-primary">
            {/* Top Image */}
            <div className="w-full h-48 p-2 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://via.placeholder.com/192x192?text=No+Image";
                    }}
                />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row p-4 gap-4 flex-grow">
                {/* Left (Details) */}
                <div className="sm:w-2/3 flex flex-col justify-center text-gray-800 space-y-2">
                    <p className="text-sm font-semibold">
                        <span className="font-bold">Name:</span> {name}
                    </p>
                    <p className="text-sm font-semibold">
                        <span className="font-bold">Age:</span> {age}
                    </p>
                    <p className="text-sm font-semibold">
                        <span className="font-bold">Gender:</span> {gender}
                    </p>
                    <p className="text-sm font-semibold">
                        <span className="font-bold">Location:</span> {location}
                    </p>
                </div>
                {/* Right (Button) */}
                <div className="sm:w-1/3 font-bold text-2xl flex sm:items-end justify-center sm:justify-end">
                    <button
                        type="button"
                        onClick={onAction}
                        className="text-primary border-3 hover:bg-primary hover:text-white cursor-pointer px-2 py-2 text-xs hover:bg-primary-dark transition"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
