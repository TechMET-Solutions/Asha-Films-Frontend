import React from "react";
import { useNavigate } from "react-router-dom";

function CastingCard({
  image,
  badge,
  title,
  subtitle,
  description,
  footer,
  children,
  onClick,
  hover = true,
  descriptionLimit = 100,
  viewMoreLink
}) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (viewMoreLink) {
      navigate(viewMoreLink);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-md overflow-hidden border border-gray-200
        ${hover ? "hover:shadow-lg hover:scale-[1.02] hover:border-primary" : ""}
        transform transition duration-300`}
    >
      {/* Image */}
      <div className="relative h-40 w-full bg-gray-100">
        {image ? (
          <img src={image} alt={title || "card image"} className="w-full h-40 object-cover" />
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
        <span className="absolute bottom-2 right-2 bg-white border border-primary text-primary text-xs px-2 py-1">
          {badge || ""}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h2 className="font-semibold text-gray-800 text-sm min-h-[20px]">
          {title || ""}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-xs mt-2 min-h-[32px]">
          {description ? (
            <>
              {description.length > descriptionLimit
                ? `${description.slice(0, descriptionLimit)}...`
                : description}

              {description.length > descriptionLimit && viewMoreLink && (
                <button
                  type="button"
                  onClick={handleViewMore}
                  className="text-primary text-xs font-semibold underline ml-1"
                >
                  View More
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </p>

        {/* Extra custom content */}
        <div className="min-h-[20px]">{children || ""}</div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center min-h-[20px]">
          {footer || ""}
        </div>
      </div>
    </div>
  );
}

export default CastingCard;
