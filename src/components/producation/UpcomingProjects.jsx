// import React from "react";
// import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

// function UpcomingProjects() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {jobs.map((job) => (
//         <div
//           key={job.id}
//           className="bg-white shadow-md overflow-hidden hover:shadow-lg hover:border-6 hover:border-primary"
//         >
//           {/* Job Image */}
//           <div className="relative">
//             <img
//               src={job.image}
//               alt={job.title}
//               className="w-full h-40 object-cover"
//             />
//             <span className="absolute bottom-2 border border-primary right-2 bg-white text-primary text-sm px-2 py-1">
//               {job.role}
//             </span>
//           </div>

//           {/* Job Details */}
//           <div className="p-4">
//             <h2 className="font-semibold text-gray-800 text-sm">
//               {job.title}
//             </h2>
//             <p className="text-gray-500 text-xs mt-1">
//               {job.description.slice(0, 80)}...
//             </p>

//             {/* Location & Date */}
//             <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm">
//               <span className="flex items-center gap-1">
//                 <FaMapMarkerAlt className="text-gray-500" /> {job.city}
//               </span>
//               <span className="flex items-center gap-1">
//                 <FaCalendarAlt className="text-gray-500" />{" "}
//                 {new Date(job.application_deadline).toLocaleDateString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                 })}
//               </span>
//             </div>

//             {/* Status & Button */}
//             <div className="flex justify-between items-center mt-4">
//               <span className="text-red-600 font-medium text-sm">
//                Closed in  {job.status} Days
//               </span>
//               <button className="border border-primary px-3 py-1 text-sm hover:bg-gray-100">
//                 Applicants
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// export default UpcomingProjects

import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";

// ✅ Card Component
function ProjectCard({ job }) {
  // Helper to calculate days left
   const navigate = useNavigate();

  const handleApplicants = () => {
    navigate(`/production/application-details/${job.id}`); // pass job/application id here
  };
  const calculateDaysLeft = (deadline) => {
    if (!deadline) return "N/A";
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Job Image */}
      <div className="relative">
        <img
          src={job.image}
          alt={job.title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-white border border-primary text-primary text-[15px] font-medium  rounded w-[120px] h-[30px] text-center ">
          {job.project_type}
        </span>
      </div>

      {/* Job Details */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-800 text-base">{job.title}</h2>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {job.project_description}
        </p>

        {/* Location & Date */}
        <div className="flex items-center  mt-3 text-gray-600 text-sm gap-5">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-500" /> {job.city_location}
          </span>
          {job.application_deadline && (
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" />
              {new Date(job.application_deadline).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          )}
        </div>

        {/* Status & Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#FF0000] font-medium text-[14px]">
            Closes in {calculateDaysLeft(job.application_deadline)} days
          </span>
          <button className="border border-primary  text-[16px] rounded hover:bg-primary hover:text-white transition w-[140px] h-[40px]"  onClick={handleApplicants}>
            Applicants
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Main Component
export default function UpcomingProjects() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // if using auth
        const res = await axios.get(`${API}/api/production/jobs/upcoming`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data.data)
        setJobs(res.data.data || []);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading projects...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center py-10 text-gray-600">No upcoming projects</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Upcoming Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <ProjectCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
