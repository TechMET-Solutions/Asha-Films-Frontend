import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import CastingCard from "../CastingCard";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function NewCastingCalls() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    const fetchJobs = async () => {

      try {
        const res = await axios.get(`${API}/api/user/calls-for-you`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          console.log("📌 API Response:", res.data);
          setJobs(res.data.jobs || []);
          setAppliedJobIds(res.data.applied_job_ids || []);
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

  const handleApplicants = (jobId, jobType) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("❌ User not found in localStorage");
        return;
      }

      navigate(`/user/castingapplicaton/${user.id}`)

    } catch (error) {
      console.error("❌ Error parsing user from localStorage:", error);
    }
  };


  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const daysLeft = getDaysLeft(job.application_deadline);
            const alreadyApplied = appliedJobIds.includes(job.id);

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
                viewMoreLink={() => navigate(`/production/view-job-details/${job.id}`)}
                onApply={() => handleApplicants(job.id)}
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

export default NewCastingCalls;