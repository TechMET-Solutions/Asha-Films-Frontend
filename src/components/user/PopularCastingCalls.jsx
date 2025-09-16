import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import CastingCard from "../CastingCard";

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
        const res = await axios.get(`${API}/api/user/popular-casting-calls`);

        if (res.data.success) {
          console.log("📌 API Response:", res.data);
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

    const getClosingText = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Closed";
    return `Closes in ${diffDays} Day${diffDays > 1 ? "s" : ""}`;
  };

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2

        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700,
          fontStyle: "bold",
          fontSize: "24px",
          lineHeight: "100%",
          letterSpacing: "5%",
        }}
        className='text-[#8B3C68] mb-6'
      >
        Popular Casting Calls
      </h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const daysLeft = getDaysLeft(job.application_deadline);

            return (
              <CastingCard
                key={job.id}
                title={job.project_type}
                description={
                  job.project_description?.trim() || "No description"
                }
                location={job.city_location || "Unknown"}
                date={
                  job.application_deadline
                    ? new Date(job.application_deadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })
                    : "N/A"
                }
                closingText={getClosingText(job.application_deadline)}
                viewMoreLink={`/production/view-job-details/${job.id}`}
                // onApply={`/user/castingapplicaton/${job.id}`}
                // applied={true}
                showActions={false} // ✅ hide Apply/View, only card content
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