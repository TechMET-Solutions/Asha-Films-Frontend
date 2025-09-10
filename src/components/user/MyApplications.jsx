import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";

function PopularCastingCalls() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Helper: Calculate days left until expiry
  const getDaysLeft = (deadline) => {
    if (!deadline) return null;

    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0; // avoid negative values
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // if you store JWT
        const res = await axios.get(`${API}/api/user/job-applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          console.log("📌 API Response:", res.data);
          setJobs(res.data.data); // ✅ correct key
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  const handleViewMore = (jobId, jobType) => {
    navigate(`/user/castingcalldetails/${jobId}`, {
      state: { jobId, jobType },
    });
  };

  const handleApplicants = (jobId, jobType) => {
    navigate(`/user/castingapplicaton/${jobId}`, {
      state: { jobId, jobType },
    });
  };

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((app) => {
            const job = app.job; // ✅ unwrap job object
            const daysLeft = getDaysLeft(job.application_deadline);

            return (
              <CastingCard
                key={app.application_id}
                image={job.image_url}
                category={job.project_type}
                title={job.project_type}
                description={job.project_description}
                location={job.city_location}
                date={app.applied_on?.slice(0, 10)}
                status={app.status}
                onViewMore={() => handleViewMore(job.id, job.project_type)}
              // onApplicantsClick={() =>
              //   handleApplicants(job.id, job.project_type)
              // }
              />
            );
          })}

        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
}

export default PopularCastingCalls;

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
      className="relative w-full max-w-sm h-[360px] flex flex-col shadow-md overflow-hidden bg-white p-3 
                 transform transition duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-2 hover:border-primary"
    >
      {/* Image */}
      <div className="relative h-40 w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {role && (
          <span className="absolute bottom-2 right-2 border border-primary bg-white text-primary text-xs px-2 py-1">
            {role}
          </span>
        )}
      </div>

      {/* Category Badge */}
      {category && (
        <div className="absolute right-5 top-[9.5rem] bg-white text-black font-medium px-3 py-0.5 shadow border border-primary text-xs">
          {category}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-3">
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {description || "No description available"}
        </p>
        <button
          className="text-primary text-sm font-bold mt-1 self-start"
          onClick={onViewMore}
        >
          View More
        </button>

        {/* Location & Date */}
        <div className="flex items-center justify-between mt-3 text-gray-500 text-xs">
          <div className="flex items-center gap-1">
            <img
              src={icons.location}
              alt="location"
              className="w-3.5 h-3.5 object-contain"
            />
            <span>{location || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={icons.calender}
              alt="calendar"
              className="w-3.5 h-3.5 object-contain"
            />
            <span>{date || "TBD"}</span>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="flex justify-between items-center mt-4">
          <span
            className={`font-medium text-sm ${
              status?.toLowerCase().includes("expire")
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {status || "Open"}
          </span>
          <button
            onClick={onApplicantsClick}
            className="border border-gray-400 px-4 py-1 text-sm hover:bg-gray-100 transition"
          >
            Apply
          </button>
        </div> */}
      </div>
    </div>
  );
};
