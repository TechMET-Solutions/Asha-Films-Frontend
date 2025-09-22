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

        console.log(res.data.jobs)
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
                viewMoreLink={`/user/view-job-details/${job.id}`}
                onApply={() => handleApplicants(job.id)}
                type='user'
              />


                // <CastingCard
                //   key={job.id}
                //   image={job.image}
                //   badge={job.project_type || job.role}
                //   title={job.project_type || job.title}
                //   description={
                //     job.project_description
                //       ? job.project_description
                //       : "No description"
                //   }
                //   onApply={() => navigate('/user/login')}
                // >
                //   {/* Extra details inside card */}
                //   <div className="flex items-center gap-4 text-gray-600 text-sm">
                //     <span className="flex items-center gap-1">
                //       <FaMapMarkerAlt className="text-gray-500" />{" "}
                //       {job.city_location}
                //     </span>
                //     <span className="flex items-center gap-1">
                //       <FaCalendarAlt className="text-gray-500" />{" "}
                //       {new Date(job.application_deadline).toLocaleDateString(
                //         "en-GB",
                //         {
                //           day: "2-digit",
                //           month: "short",
                //         }
                //       )}
                //     </span>
                //   </div>
                // </CastingCard>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaCalendarAlt, 
//   FaMapMarkerAlt, 
//   FaChevronRight, 
//   FaChevronLeft, 
//   FaFilter,
//   FaSearch,
//   FaClock
// } from "react-icons/fa";
// import { API } from "../../api";
// import CastingCard from "../../components/CastingCard";

// const CastingCalls = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [projectTypeFilter, setProjectTypeFilter] = useState("");
//   const [sortBy, setSortBy] = useState("newest");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 12;

//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Casting Calls | 1 on 1 Screen";
//   }, []);

//   // Calculate days left until expiry
//   const calculateDaysLeft = (deadline) => {
//     if (!deadline) return "N/A";
//     const today = new Date();
//     const end = new Date(deadline);
//     const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//     return diff > 0 ? diff : 0;
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Fetch jobs from backend
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API}/api/user/popular-casting-calls`);

//         if (res.data.success) {
//           setJobs(res.data.jobs);
//           setFilteredJobs(res.data.jobs);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Filter and sort jobs
//   useEffect(() => {
//     let result = [...jobs];
    
//     // Apply search filter
//     if (searchTerm) {
//       result = result.filter(job => 
//         job.project_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.project_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.city_location?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply location filter
//     if (locationFilter) {
//       result = result.filter(job => 
//         job.city_location?.toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }
    
//     // Apply project type filter
//     if (projectTypeFilter) {
//       result = result.filter(job => 
//         job.project_type?.toLowerCase().includes(projectTypeFilter.toLowerCase())
//       );
//     }
    
//     // Apply sorting
//     switch(sortBy) {
//       case "newest":
//         result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//         break;
//       case "deadline":
//         result.sort((a, b) => new Date(a.application_deadline) - new Date(b.application_deadline));
//         break;
//       case "location":
//         result.sort((a, b) => (a.city_location || '').localeCompare(b.city_location || ''));
//         break;
//       default:
//         break;
//     }
    
//     setFilteredJobs(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [jobs, searchTerm, locationFilter, projectTypeFilter, sortBy]);

//   // Get unique locations and project types for filters
//   const locations = [...new Set(jobs.map(job => job.city_location).filter(Boolean))];
//   const projectTypes = [...new Set(jobs.map(job => job.project_type).filter(Boolean))];

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Skeleton loading component
//   const SkeletonLoader = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {[...Array(8)].map((_, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
//           <div className="h-48 bg-gray-300"></div>
//           <div className="p-4">
//             <div className="h-6 bg-gray-300 rounded mb-2"></div>
//             <div className="h-4 bg-gray-300 rounded mb-4"></div>
//             <div className="flex justify-between">
//               <div className="h-4 w-20 bg-gray-300 rounded"></div>
//               <div className="h-8 w-24 bg-gray-300 rounded"></div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6">
//       <h2 className="text-2xl md:text-3xl font-bold text-[#8B3C68] my-6">
//         Casting Calls
//       </h2>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Search */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search jobs..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Location Filter */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//           >
//             <option value="">All Locations</option>
//             {locations.map((location, index) => (
//               <option key={index} value={location}>{location}</option>
//             ))}
//           </select>

//           {/* Project Type Filter */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             value={projectTypeFilter}
//             onChange={(e) => setProjectTypeFilter(e.target.value)}
//           >
//             <option value="">All Project Types</option>
//             {projectTypes.map((type, index) => (
//               <option key={index} value={type}>{type}</option>
//             ))}
//           </select>

//           {/* Sort By */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="newest">Newest First</option>
//             <option value="deadline">Application Deadline</option>
//             <option value="location">Location</option>
//           </select>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-gray-600">
//           Showing {filteredJobs.length} of {jobs.length} jobs
//         </p>
//         {filteredJobs.length > 0 && (
//           <p className="text-gray-600">
//             Page {currentPage} of {totalPages}
//           </p>
//         )}
//       </div>

//       {loading ? (
//         <SkeletonLoader />
//       ) : filteredJobs.length > 0 ? (
//         <>
//           {/* Job Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {currentJobs.map((job) => {
//               const daysLeft = calculateDaysLeft(job.application_deadline);

//               return (
//                 <CastingCard
//                   key={job.id}
//                   image={job.image}
//                   badge={job.project_type || job.role}
//                   title={job.project_type || "Untitled Project"}
//                   description={
//                     job.project_description
//                       ? job.project_description.length > 100 
//                         ? `${job.project_description.substring(0, 100)}...` 
//                         : job.project_description
//                       : "No description available"
//                   }
//                   footer={
//                     <>
//                       <div className="flex items-center text-sm text-red-600 font-medium">
//                         <FaClock className="mr-1" />
//                         {daysLeft === "N/A" ? "No deadline" : `Closes in ${daysLeft} days`}
//                       </div>
//                       <button
//                         onClick={() => navigate('/user/login')}
//                         className="border border-primary px-4 py-1 rounded hover:bg-primary hover:text-white transition"
//                       >
//                         Apply
//                       </button>
//                     </>
//                   }
//                 >
//                   {/* Extra details inside card */}
//                   <div className="flex flex-col gap-2 text-gray-600 text-sm mt-2">
//                     <span className="flex items-center gap-1">
//                       <FaMapMarkerAlt className="text-gray-500" />{" "}
//                       {job.city_location || "Location not specified"}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaCalendarAlt className="text-gray-500" />{" "}
//                       {formatDate(job.application_deadline)}
//                     </span>
//                   </div>
//                 </CastingCard>
//               );
//             })}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8 space-x-2">
//               <button
//                 className="px-4 py-2 border rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <FaChevronLeft className="mr-1" /> Previous
//               </button>

//               {/* Page numbers */}
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNumber = index + 1;
                
//                 // Show limited page numbers with ellipsis for many pages
//                 if (
//                   pageNumber === 1 || 
//                   pageNumber === totalPages || 
//                   (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
//                 ) {
//                   return (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={`px-4 py-2 border rounded-md ${
//                         currentPage === pageNumber
//                           ? "bg-[#8B3C68] text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 } else if (
//                   pageNumber === currentPage - 2 ||
//                   pageNumber === currentPage + 2
//                 ) {
//                   return <span key={pageNumber} className="px-2 py-2">...</span>;
//                 }
//                 return null;
//               })}

//               <button
//                 className="px-4 py-2 border rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next <FaChevronRight className="ml-1" />
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="text-center py-12 bg-white rounded-lg shadow-md">
//           <div className="text-gray-400 mb-4">
//             <FaFilter size={48} className="mx-auto" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
//           <p className="text-gray-500 mb-4">
//             Try adjusting your search filters or check back later for new opportunities.
//           </p>
//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setLocationFilter("");
//               setProjectTypeFilter("");
//             }}
//             className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CastingCalls;