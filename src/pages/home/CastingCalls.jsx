import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt,FaChevronRight,FaChevronLeft } from "react-icons/fa";
import { API } from "../../api";
import CastingCard from "../../components/CastingCard";

const CastingCalls = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    document.title = "Casting Calls | 1 on 1 Screen";
  }, []);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12; // show 6 jobs per page

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

  // ✅ Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API}/api/user/popular-casting-calls`);

        if (res.data.success) {
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

      const calculateDaysLeft = (deadline) => {
    if (!deadline) return "N/A";
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // ✅ Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        className="text-[#8B3C68] my-6"
      >
        Casting Calls
      </h2>

      {currentJobs.length > 0 ? (
        <>
          {/* ✅ Job Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentJobs.map((job) => {
              const daysLeft = getDaysLeft(job.application_deadline);

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
                  footer={
                  <>
                    <span className="text-red-600 font-medium text-sm">
                      Closes in {calculateDaysLeft(job.application_deadline)} days
                    </span>
                    <button
                      onClick={() => navigate('/user/login')}
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
                      {job.city_location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-500" />{" "}
                      {new Date(job.application_deadline).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}
                    </span>
                  </div>
                </CastingCard>
              );
            })}
          </div>

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#8B3C68] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
};

export default CastingCalls;
