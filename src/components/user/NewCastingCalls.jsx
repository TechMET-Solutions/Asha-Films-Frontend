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

  const calculateDaysLeft = (deadline) => {
    if (!deadline) return "N/A";
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const daysLeft = getDaysLeft(job.application_deadline);
            const alreadyApplied = appliedJobIds.includes(job.id);

            return (
              <CastingCard
                key={job.id}
                image={job.image}
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
                      onClick={() => handleApplicants()}
                      className="border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white transition"
                    >
                      Applicants
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

export default NewCastingCalls;