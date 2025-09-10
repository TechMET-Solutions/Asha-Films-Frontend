import React from "react";
import { icons } from "../../assets";

const CastingCard = ({
  image,
  category,
  title,
  description,
  role,
  location,
  date,
  status,
  onViewMore,
  onApplicantsClick,
}) => {
  return (
    <div
      className="relative max-w-sm shadow-md overflow-hidden bg-white p-3 
                 cursor-pointer transform transition duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-2 hover:border-primary"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-2 border border-primary right-2 bg-white text-primary text-sm px-2 py-1">
          {role}
        </span>
      </div>

      {/* Category Badge */}
      {category && (
        <div className="absolute right-5 top-[11rem] bg-white text-black font-medium px-4 py-1 shadow border border-primary">
          {category}
        </div>
      )}

      {/* Content */}
      <div className="p-4 pt-6">
        {/* Title */}
        <h3 className="font-semibold text-lg">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1">
          {description ? description.slice(0, 80) : "No description available"}...
          <span
            className="text-primary font-bold cursor-pointer"
            onClick={onViewMore}
          >
            View More
          </span>
        </p>

        {/* Location & Date */}
        <div className="flex items-center justify-between mt-3 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <img
              src={icons.location}
              alt="location"
              className="w-4 h-4 object-contain"
            />
            <span>{location || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={icons.calender}
              alt="calendar"
              className="w-4 h-4 object-contain"
            />
            <span>{date || "TBD"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={`font-medium text-red-500 text-sm }`}
          >
            {status || "Open"}
          </span>
          <button
            onClick={onApplicantsClick}
            className="border border-gray-400 px-4 py-1 hover:bg-gray-100 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CastingCard;
