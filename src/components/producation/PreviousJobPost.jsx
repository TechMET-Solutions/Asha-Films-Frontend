import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";


function PreviousJobPost() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/production/jobs/previous`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data.data)

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

  const handleApplicants = () =>{
    navigate('/production/applicant-profile')
  }

  if (loading) {
    return <p className="text-center py-6">Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center py-6">No previous jobs found.</p>;
  }
   

  return (

    <>
      
    <div
  style={{
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "0.05em", // ✅ not 5%
    textAlign: "justify",
        }}
        className="text-[#8B3C68]"
>
  Previous Job Post
</div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white shadow-md overflow-hidden hover:shadow-lg "
        >
          {/* Job Image */}
          <div className="relative">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-40 object-cover"
            />
            <span className="absolute bottom-2 border border-primary right-2 bg-white text-primary text-sm px-2 py-1 ">
              {job.project_type || job.role}
            </span>
          </div>

          {/* Job Details */}
          <div className="p-4">
            <h2 className="font-semibold text-gray-800 text-sm">
              {job.project_description || job.title}
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              {(job.project_description || job.description)?.slice(0, 80)}...
            </p>

            {/* Location & Date */}
            <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm">
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

            {/* Status & Button */}
               <div className="flex justify-between items-center mt-4">
                <div>
 <span className="text-red-600 font-medium text-sm">Closed</span>
                </div>
       
        
                 <button className="border border-primary  text-[16px] rounded hover:bg-primary hover:text-white transition w-[140px] h-[40px]" onClick={handleApplicants}>
            Applicants
                </button>
                

    
    </div>
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
}

export default PreviousJobPost;
