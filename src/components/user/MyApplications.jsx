import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";
import CastingCard from "../CastingCard";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function MyApplication() {
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

  const handleApplicants = (jobId, jobType) => {
    navigate(`/user/castingapplicaton/${jobId}`, {
      state: { jobId, jobType },
    });
  };

    const calculateDaysLeft = (deadline) => {
    if (!deadline) return "N/A";
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map((app) => {
            const job = app.job; // ✅ unwrap job object
            const daysLeft = getDaysLeft(job.application_deadline);

            return (
              <CastingCard
                key={job.id}
                image={job.image_url}
                badge={job.project_type || job.role}
                title={job.project_type || job.title}
                description={
                  job.project_description
                    ? job.project_description
                    : "No description"
                }
                viewMoreLink={`/production/view-job-details/${job.id}`}
                footer={
                  <>
                    <span className="text-red-600 font-medium text-sm">
                      Closes in {calculateDaysLeft(job.application_deadline)} days
                    </span>
                    <button
                      className="text-green-500 font-semibold px-4 py-1 rounded hover:text-green-500 transition"
                    >
                      Applied
                    </button>
                  </>
                }
              >
                {/* Extra details inside card */}
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" /> {job.city_location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-500" />{" "}
                    {new Date(job.application_deadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </CastingCard>
            );
          })}

        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
}

export default MyApplication;


