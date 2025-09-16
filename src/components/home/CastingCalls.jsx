import { useNavigate } from "react-router-dom";
import { gif } from "../../assets";
import { FaArrowRight } from "react-icons/fa";

const CastingCalls = ({ latestJobs = [] }) => {

  const navigate = useNavigate()

  return (
    <div className="text-left mt-4 sm:mt-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img
            src={gif.bill}
            alt="Actor"
            className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 object-cover"
          />
          <span className="font-bold text-md sm:text-lg">
            Casting Call / Update
          </span>
        </div>
        <button
        onClick={()=> navigate('/castingcalls')}
        className="text-xs sm:text-sm text-primary font-medium cursor-pointer">
          
          View All ➜
        </button>
      </div>

      {latestJobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No casting calls available</p>
      ) : (
        latestJobs.map((job) => (
          <div
            key={job.id}
            className="bg-pink-100 rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 shadow-md flex justify-between items-center casting-call-card border-3 border-transparent hover:border-primary"
          >
            <div>
              <h4 className="font-semibold text-xs sm:text-sm mb-1">
                {job.project_type}
              </h4>
              <p className="text-xs text-gray-600">
                {job.city_location} |{" "}
                {new Date(job.posted_on).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {job.project_description}
              </p>
            </div>
            <FaArrowRight className="text-sm" />
          </div>
        ))
      )}
    </div>
  );
};

export default CastingCalls;
