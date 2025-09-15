import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { API } from "../../api";
import CastingCard from "../CastingCard";
import { useNavigate } from "react-router-dom";

function UpcomingProjects() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/production/jobs/upcoming`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setJobs(res.data.data);
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplicants = (id) => {
    navigate(`/production/applicant-profile/${id}`);
  };

  const calculateDaysLeft = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Closed";
    return `Closes in ${diffDays} Day${diffDays > 1 ? "s" : ""}`;
  };

  if (loading) return <p className="text-center py-6">Loading jobs...</p>;
  if (jobs.length === 0)
    return <p className="text-center py-6">No upcoming jobs found.</p>;

  return (
    <>
      <h1 className="text-[#8B3C68] font-bold text-xl mb-4">Upcoming Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobs.map((job) => (
          <CastingCard
          key={job.id}
            title={job.project_type}
            description={
              job.project_description
                ? job.project_description
                : "No description"
            }
            location={job.city_location || "Unknown"}
            date={job.application_deadline ? new Date(job.application_deadline).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                }
              )
              : "N/A"}
            closingText={calculateDaysLeft(job.application_deadline)}
            viewMoreLink={`/production/view-job-details/${job.id}`}
            onApply={handleApplicants}
          />
        ))}
      </div>
    </>
  );
}

export default UpcomingProjects;
