import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { API } from "../../api";
import CastingCard from "../CastingCard";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

function PreviousJobPost() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/production/jobs/previous`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.data);

        if (res.data.success) {
          setJobs(res.data.data);
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

  if (loading) return <p className="text-center py-6">Loading jobs...</p>;
  if (jobs.length === 0)
    return <p className="text-center py-6">No previous jobs found.</p>;

  return (
    <>
      <h1 className="text-[#8B3C68] font-bold text-xl mb-4">
        Previous Job Post
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 hover:border-primary">
        {jobs.map((job) => (
          <CastingCard
            key={job.id}
            image={job.image}
            badge={job.project_type}
            title={job.project_type}
            description={
              job.project_description
                ? job.project_description.slice(0, 60) + "..."
                : "No description"
            }
            footer={
              <>
                <span className="text-red-600 font-medium text-sm">Closed</span>
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
                <FaMapMarkerAlt className="text-gray-500" />{" "}
                {job.city_location || "Unknown"}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-gray-500" />{" "}
                {job.application_deadline
                  ? new Date(job.application_deadline).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )
                  : "N/A"}
              </span>
            </div>
          </CastingCard>
        ))}
      </div>
    </>
  );
}

export default PreviousJobPost;
