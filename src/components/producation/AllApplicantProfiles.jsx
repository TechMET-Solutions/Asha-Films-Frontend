// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const AllApplicantProfiles = () => {
//   const [applicants, setApplicants] = useState([]);

//   console.log(applicants,"applicants")
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/api/production/applications/all",
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjb250YWN0QGNyZWF0aXZlcHJvZC5jb20iLCJjb21wYW55X25hbWUiOiJDcmVhdGl2ZSBQcm9kdWN0aW9ucyBQdnQgTHRkIiwiaWF0IjoxNzU3MzI1MDIwLCJleHAiOjE3NTczNTM4MjB9.EqRf_LWoEvoJnJGpgDj66W4dt54Q-E2f73CtN5wu1DA`,
//             },
//           }
//         );

//         if (res.data.success) {
//           const mappedUsers = res.data.users.map((u) => ({
//             id:u.id || "null",
//             name: u.name || "Unknown",
//             age: u.age || "N/A",
//             gender: res.data.job?.gender || "N/A",
//             location: u.city || "Not Provided",
//             image: u.image_url || "https://via.placeholder.com/150",
//           }));

//           setApplicants(mappedUsers);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching applicants:", error);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchApplicants();
//   }, []);

//   return (
//      <div className="p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">
//         All Received Applications
//       </h2>

//       {loading ? (
//         <p className="text-gray-500">Loading applicants...</p>
//       ) : applicants.length > 0 ? (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {applicants.map((applicant, index) => (
//             <ApplicationCard key={index} {...applicant} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No applicants found.</p>
//       )}
//     </div>
//   );
// };

// export default AllApplicantProfiles;



// const ApplicationCard = ({ name, age, gender, location, image ,id}) => {
  
//   const navigate = useNavigate();
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
//       {/* Profile Image */}
//       <div className="w-full h-40">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Info */}
//       <div className="p-4 space-y-2">
//         <p className="text-gray-800 font-bold text-sm">
//           Name: <span className="font-normal">{name}</span>
//         </p>
//         <p className="text-gray-800 font-bold text-sm">
//           Age: <span className="font-normal">{age} yrs</span>
//         </p>
//         <p className="text-gray-800 font-bold text-sm">
//           Gender: <span className="font-normal">{gender}</span>
//         </p>
//         <div className="flex justify-between items-center">
//           <p className="text-gray-800 font-bold text-sm">
//             Location: <span className="font-normal">{location}</span>
//           </p>
//           <button className="border-2 border-primary text-primary text-xs font-semibold px-3 py-1 rounded-lg hover:bg-primary hover:text-white transition"  onClick={() => navigate(`/production/applicant-profile/${id}`)}>
//             View More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AllApplicantProfiles = () => {
    const navigate = useNavigate();
     
 
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/production/applications/all",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjb250YWN0QGNyZWF0aXZlcHJvZC5jb20iLCJjb21wYW55X25hbWUiOiJDcmVhdGl2ZSBQcm9kdWN0aW9ucyBQdnQgTHRkIiwiaWF0IjoxNzU3MzI1MDIwLCJleHAiOjE3NTczNTM4MjB9.EqRf_LWoEvoJnJGpgDj66W4dt54Q-E2f73CtN5wu1DA`,
            },
          }
        );

        if (res.data.success) {
          const mappedUsers = res.data.users.map((u) => ({
            id:u.id || "null",
            name: u.name || "Unknown",
            age: u.age || "N/A",
             city: u.city || "N/A",
            gender: res.data.job?.gender || "N/A",
            location: u.city || "Not Provided",
            image: u.image_url || "https://via.placeholder.com/150",
          }));

          setApplicants(mappedUsers);
        }
      } catch (error) {
        console.error("❌ Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchApplicants();
  }, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 ">
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
  All Received Applications
</h2>


      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {applicants.map((app) => (
            <div
              key={app.application_id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Applicant Image */}
              <div className="relative">
                <img
                  src={
                    app?.image_url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={app.name}
                  className="w-full h-40 object-cover"
                />
                {/* <span className="absolute bottom-2 right-2 bg-white border border-primary text-primary text-[14px] font-medium rounded w-[100px] h-[28px] flex items-center justify-center">
                  {app.user.gender}
                </span> */}
              </div>

              {/* Applicant Details */}
              <div className="p-4">
               
                <span className="font-semibold text-[#494C4E]  text-[16px]"></span> Name: <span className="text-[16px] text-[#494C4E]">{app?.name} </span>
               
                {/* <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {app.role_specific_info || "No experience details provided"}
                </p> */}
                      <div className="mt-2">
                          
 <span className="font-bold text-[#494C4E] text-[16px]"></span> Age: <span className="text-[16px] text-[#494C4E]">{app?.age} yrs </span>
                      </div>

                       <div className="mt-2">
                          
 <span className="font-bold text-[#494C4E]  text-[16px]"></span> Gender: <span className="text-[16px] text-[#494C4E]">{app?.gender}</span>
                      </div>

                      <div className="mt-2 flex justify-between">
                          <div>
                              
                              <span className="font-bold text-[#494C4E]text-[16px]"></span> Location: <span className="text-[16px] text-[#494C4E]">{app?.city}</span> 
                          </div>
                          
                          <div>
                                  <button
        onClick={() => navigate(`/production/applicant-profile/${app.id}`)}
        className="border border-primary text-[16px] rounded hover:bg-primary hover:text-white transition w-[140px] h-[40px] text-[#8B3C68]"
      >
        View More
      </button>

                          </div>
                          </div>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllApplicantProfiles;


