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
    if (!deadline) return "N/A";
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
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
            image={job.image}
            badge={job.project_type || job.role}
            title={job.project_type || job.title}
            description={
              job.project_description
                ? job.project_description.slice(0, 60) + "..."
                : "No description available"
            }
            footer={
              <>
                <span className="text-red-600 font-medium text-sm">
                  Closes in {calculateDaysLeft(job.application_deadline)} days
                </span>
                <button
                  onClick={() => handleApplicants(job.id)}
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
        ))}
      </div>
    </>
  );
}

export default UpcomingProjects;
