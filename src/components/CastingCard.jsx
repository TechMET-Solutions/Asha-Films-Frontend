import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CastingCard({
  title,
  description,
  location,
  date,
  closingText,
  viewMoreLink,
  onApply,
  applied = false,
  showActions = true,
  type, 
}) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (viewMoreLink) {
      navigate(viewMoreLink);
    }
  };

  return (
    <div
      className="group bg-white shadow-md border border-gray-200 overflow-hidden max-w-sm 
                 transition-colors duration-300 hover:border-primary hover:border-4"
    >
      {/* Header */}
      <h3
        className="text-lg font-semibold bg-primary text-center text-white p-2 
                   transition-colors duration-300 hover:scale-[1.02] group-hover:bg-white group-hover:text-primary"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm px-4 text-gray-600 mt-2">
        {description?.length > 100 ? (
          <>
            {description.slice(0, 100)}...
            <span
              className="text-black font-medium cursor-pointer"
              onClick={handleViewMore}
            >
              View More
            </span>
          </>
        ) : (
          description || "No description"
        )}
      </p>

      {/* Extra Details */}
      <div className="flex px-4 items-center gap-6 mt-4 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-4 flex items-center justify-center px-4">
          {applied ? (
            <span className="text-green-600 my-3 w-[80%] mt-4 text-center border border-green-600 py-2 px-4 font-semibold">
            Applied
            </span>
          ) : (
            <button
              onClick={onApply}
              className="w-[80%] py-2 px-4  my-3 border border-primary text-gray-700 font-medium mt-4  cursor-pointer
                    transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
            >
              Apply
            </button>
          )}
        </div>
      )}

      {/* Closing Text */}
      {closingText && (
        <p className="text-center p-4 text-red-600 text-sm font-medium mt-2">
          {closingText}
        </p>
      )}
    </div>
  );
}

export default CastingCard;
